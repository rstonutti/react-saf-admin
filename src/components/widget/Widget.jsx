import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

/* const compare = (a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0); */

const Widget = ({ type, valores }) => {
  let data, amount, diff;

  switch (type) {
    case "usuarios":
      data = {
        title: "USUARIOS",
        isMoney: false,
        //link: "Ver todos los usuarios",
        link: "Ver todos los usuarios",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "productos":
      data = {
        title: "PRODUCTOS",
        isMoney: false,
        link: "Ver todos los productos",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      amount = valores[1].productos;
      diff =
        ((valores[1].productos - valores[0].productos) / valores[0].productos) *
        100;
      break;
    case "ordenes":
      data = {
        title: "VENTAS",
        isMoney: false,
        link: "Ver todas las ventas",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      /* valoresSort = valores.sort(compare); */
      amount = valores[1].ordenes;
      diff =
        ((valores[1].ordenes - valores[0].ordenes) / valores[0].ordenes) * 100;
      break;
    case "ingresos":
      data = {
        title: "INGRESOS",
        isMoney: true,
        link: "Ver los detalles",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      /* valoresSort = valores.sort(compare); */
      amount = valores[1].total;
      diff = ((valores[1].total - valores[0].total) / valores[0].total) * 100;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {diff && diff <= 0 ? (
          <div className="percentage negative">
            <KeyboardArrowDown />
            {diff.toFixed()} %
          </div>
        ) : (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {diff && diff.toFixed()} %
          </div>
        )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
