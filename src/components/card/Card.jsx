import { Image, Transformation } from "cloudinary-react";

import "./card.scss";

const Card = ({ img, nombre, precio, uid }) => {
  return (
    <div key={uid}>
      {nombre}
      <Image cloudName="dawjd5cx8" publicId={img}>
        <Transformation
          height="100"
          width="100"
          aspectRatio="1.5"
          crop="fill"
        />
      </Image>
    </div>
  );
};

export default Card;
