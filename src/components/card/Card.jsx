import { Image, Transformation } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalize-first-letter";
import { addCart } from "../../redux/actions/shopping";

import "./card.scss";

const Card = ({ img, nombre, precio, uid, designado, destino }) => {
  const dispatch = useDispatch();
  let cantidad;
  if (destino) {
    cantidad = destino.find((lugares) => lugares.punto._id === designado);
  }
  return (
    <div className="card-container" key={uid}>
      <div className="card-img">
        <Image cloudName="dawjd5cx8" publicId={img}>
          <Transformation
            height="100"
            width="100"
            aspectRatio="1.5"
            crop="fill"
          />
        </Image>
      </div>
      <div className="card-title">
        <div className="card-title-left">
          <div className="card-name">
            <b>{capitalizeFirstLetter(nombre.toLowerCase())}</b>
          </div>
          <div className="card-cantidad">
            {cantidad ? (
              <div className="card-cantidad-contenido step--1">
                <span>Cantidad: {cantidad.cantidad}</span>
              </div>
            ) : null}
          </div>
          <div className="card-price step--1">Precio: {`$${precio}`}</div>
        </div>

        <button className="step--1" onClick={() => dispatch(addCart(uid, designado))}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Card;
