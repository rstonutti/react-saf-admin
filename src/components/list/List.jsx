import { Image, Transformation } from "cloudinary-react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import RemoveIcon from "@mui/icons-material/Remove";

import "./list.scss";
import { capitalizeFirstLetter } from "../../helpers/capitalize-first-letter";
import { useDispatch } from "react-redux";
import { addCart, delFromCart } from "../../redux/actions/shopping";

const List = ({ img, nombre, precio, cantidad, destino, designado, uid }) => {
  const dispatch = useDispatch();
  let disponible = destino.find((lugares) => lugares.punto._id === designado);

  return (
    <div className="list-container" key={uid}>
      <div className="list-img">
        <Image cloudName="dawjd5cx8" publicId={img}>
          <Transformation
            height="100"
            width="100"
            aspectRatio="1.5"
            crop="fill"
          />
        </Image>
        <div className="list-name">
          <div className="list-name-contenido">
            <b>{capitalizeFirstLetter(nombre.toLowerCase())}</b>
          </div>
          <div className="list-name-contenido step--1">
            Cant. restante: {disponible.cantidad}
          </div>
        </div>
      </div>
      <div className="cantidades">
        <div className="list-icon">
          <IndeterminateCheckBoxIcon
            className="icon"
            onClick={() => dispatch(delFromCart(uid, designado))}
          />
          {cantidad}
          <AddBoxIcon
            className="icon"
            onClick={() => dispatch(addCart(uid, designado))}
          />
          {/* <DeleteIcon /> */}
        </div>
        <div className="list-price">{`$${precio * cantidad}`}</div>
      </div>
    </div>
  );
};

export default List;
