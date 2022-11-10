import "./sidebar.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EggIcon from "@mui/icons-material/Egg";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import StyleIcon from "@mui/icons-material/Style";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">saf-admin</span>
      </div>
      {/* <hr /> */}
      <div className="center">
        <ul>
          <p className="title">Principal</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Listas</p>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>Usuarios</span>
          </li>
          <li>
            <StoreMallDirectoryIcon className="icon" />
            <span>Puntos</span>
          </li>
          <li>
            <StyleIcon className="icon" />
            <span>Categoría</span>
          </li>
          <li>
            <EggIcon className="icon" />
            <span>Productos</span>
          </li>
          <li>
            <ListAltIcon className="icon" />
            <span>Ordenes</span>
          </li>
          {/* <li>
            <QueryStatsIcon className="icon" />
            <span>Estadistícas</span>
          </li> */}
          <p className="title">Inventario</p>
          <Link to="/stock">
            <li>
              <InventoryIcon className="icon" />
              <span>Inventario</span>
            </li>
          </Link>
          <p className="title">Facturación</p>
          <Link to="/pos">
            <li>
              <PaymentIcon className="icon" />
              <span>Cajero</span>
            </li>
          </Link>
          <p className="title">Usuario</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Perfil</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Configuración</span>
          </li>
          <Link className="nav-link" to="/" onClick={handleLogout}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">Algo</div> */}
    </div>
  );
};

export default Sidebar;
