import { Image, Transformation } from "cloudinary-react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import RemoveIcon from "@mui/icons-material/Remove";

import "./list.scss";
import { capitalizeFirstLetter } from "../../helpers/capitalize-first-letter";

const List = ({
  img,
  nombre,
  precio,
  cantidad,
  destino,
  designado,
  uid,
  addCart,
  delFromCart,
}) => {
  let disponible = destino.find((punto) => punto.punto === designado);
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
            Restante: {disponible.cantidad}
          </div>
        </div>
      </div>
      <div className="cantidades">
        <div className="list-icon">
          <IndeterminateCheckBoxIcon
            className="icon"
            onClick={() => delFromCart(uid)}
          />
          {cantidad}
          <AddBoxIcon className="icon" onClick={() => addCart(uid)} />
          {/* <DeleteIcon /> */}
        </div>
        <div className="list-price">{`$${precio * cantidad}`}</div>
      </div>
    </div>
  );
};

export default List;
