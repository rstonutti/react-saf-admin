import { Image, Transformation } from "cloudinary-react";

import "./card.scss";

const Card = ({ img, nombre, precio, uid, addCart }) => {
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
        <div>
          <div className="card-name">{nombre}</div>
          <div className="card-price">{`$${precio}`}</div>
        </div>
        <button onClick={() => addCart(uid)}>Agregar</button>
      </div>
    </div>
  );
};

export default Card;
