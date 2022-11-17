import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./addInventory.scss";
import { useEffect, useState } from "react";
import { fetchSinToken } from "../../../helpers/fetch";
import { useForm } from "../../../hooks/useForm";
import { Image, Transformation } from "cloudinary-react";
import Spinner from "../../../components/spinner/Spinner";
import Searching from "../../../components/searching/Searching";

const inventoryInputs = [
  {
    id: 1,
    label: "Producto",
    type: "text",
    placeholder: "Selecciona un producto...",
    input: "input",
  },
  {
    id: 2,
    label: "Proveedor",
    type: "text",
    placeholder: "Selecciona un proveedor...",
    input: "select",
    variable: "productor",
  },
  {
    id: 3,
    label: "LOTE",
    type: "text",
    placeholder: "Selecciona el lote...",
    input: "select",
    variable: "lote",
  },
  {
    id: 4,
    label: "Destino",
    type: "text",
    placeholder: "Selecciona un destino...",
    input: "select",
    variable: "destino",
  },
  {
    id: 5,
    label: "Cantidad",
    type: "number",
    placeholder: "Ingrese una cantidad",
    input: "input",
  },
  /*{
    id: 6,
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: 7,
    label: "Country",
    type: "text",
    placeholder: "USA",
  }, */
];

const AddInventory = () => {
  const [selects, setSelects] = useState({});
  const [loading, setLoading] = useState(true);
  const [encontrado, setEncontrado] = useState();
  const [buscando, setBuscando] = useState(false);

  console.log(encontrado, "encontrado");

  const [formValues, handleInputChange] = useForm({
    producto: "",
    proveedor: "",
    lote: "",
    cantidad: 0,
  });

  const { producto, proveedor, lote, cantidad, destino } = formValues;

  const cargarInformacion = async () => {
    const resp = await fetchSinToken(`api/v1/productos?desde=0&limite=100`);

    const { productos, categorias, destinos, lotes, productores, disponibles } =
      await resp.json();

    if (resp.ok) {
      setSelects({ ...selects, destinos, lotes, productores, disponibles });
      setLoading(false);
    }
  };

  const buscador = async () => {
    setBuscando(true);
    const resp = await fetchSinToken(
      `api/v1/buscar/productos/${producto}/?proveedor=${proveedor}&lote=${lote}`
    );

    const { results } = await resp.json();

    if (resp.ok) {
      setEncontrado(results[0]);
    }

    setBuscando(false);
  };

  useEffect(() => {
    cargarInformacion();
  }, []);

  useEffect(() => {
    producto && proveedor && lote && buscador();
  }, [producto, proveedor, lote]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="stock">
      <div className="stock-container">
        <div className="top">
          <h1>Agregar al inventario:</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {buscando ? (
              <Searching />
            ) : encontrado ? (
              <>
                <Image
                  className="cellImg"
                  cloudName="dawjd5cx8"
                  publicId={encontrado.img}
                  alt="avatar"
                >
                  <Transformation
                    height="100"
                    width="100"
                    //radius="max"
                    aspectRatio="1.5"
                    crop="fill"
                  />
                </Image>
                <div className="step--1">Producto encontrado 👍</div>
              </>
            ) : (
              <>
                <Image
                  className="cellImg"
                  cloudName="dawjd5cx8"
                  publicId="saf/not-found/not-found_sxh8ev"
                  alt="avatar"
                >
                  <Transformation
                    height="100"
                    width="100"
                    //radius="max"
                    aspectRatio="1.5"
                    crop="fill"
                  />
                </Image>
                <div className="step--1">Nada por aquí...</div>
              </>
            )}
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Completa el formulario
                  <DriveFileRenameOutlineIcon className="icon" />
                </label>
              </div>

              <div className="formInput">
                <label>
                  Productos <span>*</span>
                </label>
                <select
                  name="producto"
                  className="styled-select semi-square"
                  onChange={handleInputChange}
                >
                  <option>Seleccione un producto...</option>
                  {selects.disponibles.map((productos) => (
                    <option value={productos.nombre} key={productos.nombre}>
                      {productos.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>
                  Proveedor <span>*</span>
                </label>
                <select
                  name="proveedor"
                  className="styled-select semi-square"
                  onChange={handleInputChange}
                >
                  <option>Seleccione un proveedor...</option>
                  {selects.productores.map(({ uid, nombre }) => (
                    <option value={uid} key={uid}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>
                  LOTE <span>*</span>
                </label>
                <select
                  name="lote"
                  className="styled-select semi-square"
                  onChange={handleInputChange}
                >
                  <option>Seleccione un LOTE...</option>
                  {selects.lotes.map((lote) => (
                    <option value={lote} key={lote}>
                      {lote}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Destino</label>
                <select
                  name="destino"
                  className="styled-select semi-square"
                  onChange={handleInputChange}
                >
                  <option>Seleccione un destino...</option>
                  {selects.destinos.map(({ uid, nombre }) => (
                    <option value={uid} key={uid}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={cantidad}
                  onChange={handleInputChange}
                  placeholder="Ingrese una cantidad..."
                />
              </div>

              <button>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
