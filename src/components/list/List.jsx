import { Image, Transformation } from "cloudinary-react";

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import RemoveIcon from '@mui/icons-material/Remove';

import "./list.scss";

const List = ({ img, nombre, precio, cantidad, uid, addCart, delFromCart }) => {
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
        <div className="list-name">{nombre}</div>
      </div>
      <div className="list-icon">
        <IndeterminateCheckBoxIcon onClick={() => delFromCart(uid)} />
        {cantidad}
        <AddBoxIcon onClick={() => addCart(uid)} />
        {/* <DeleteIcon /> */}
      </div>
      <div className="list-price">{`$${precio * cantidad}`}</div>
    </div>
  );
};

export default List;