import { useEffect, useState } from "react";
import "./styles/cashier.scss";

import { fetchSinToken } from "../../helpers/fetch";
import { getProducts } from "../../helpers/products";

import Card from "../../components/card/Card";

const Cashier = () => {
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const resp = await fetchSinToken("api/v1/productos?desde=0&limite=20");
      const data = await resp.json();
      if (resp.ok) {
        console.log("Sí");
        setProductos(data.productos);
        setCargando(false);
        console.log(productos.productos, "desde useeffect");
      }
      console.log(data);
      /* if (resp.ok) {
        setProductos(resp);
      }
      setCargando(false); */
    };
    cargarProductos();
  }, []);

  if (cargando) {
    return <div>Espera papu</div>;
  }

  if (!productos.length) {
    return <div>Nada por aquí... </div>;
  }

  return (
    <div className="cashier">
      <div className="cashier-left">
        <div className="navbar">Soberanía Alimentaria Formoseña</div>
        {productos.map((item) => (
          <Card key={item.uid} {...item} />
        ))}
      </div>
      <div className="cashier-right"></div>
    </div>
  );
};

export default Cashier;
