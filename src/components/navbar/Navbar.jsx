import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Image, Transformation } from "cloudinary-react";
import SearchOutlineIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import "./navbar.scss";

const Navbar = () => {
  const {
    state: { uid, img, nombre },
  } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Buscar..." />
          <SearchOutlineIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">Bienvenido, {nombre}!</div>
          <div className="item">
            <Image cloudName="dawjd5cx8" publicId={img}>
              <Transformation
                height="30"
                width="30"
                radius="max"
                aspectRatio="1.5"
                crop="fill"
              />
            </Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
