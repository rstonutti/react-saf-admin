import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ dia: [{ total }], mes: [anterior], semana: [actual] }) => {
  console.log(total, anterior, actual);
  let porcentaje = (total * 100) / actual.total;
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Ingresos totales</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={porcentaje}
            text={`${porcentaje.toFixed()}`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Ingresos del día</p>
        <p className="amount">${total}</p>
        <p className="desc">Es posible que no se incluyan los últimos pagos.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Semana</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${actual.total}</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Semana pasada</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
          <div className="item">
            <div className="itemTitle">Mes pasado</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${anterior.total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
