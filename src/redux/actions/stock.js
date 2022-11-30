import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { TYPES } from "../types/types";
import Swal from "sweetalert2";

export const cargarInventario = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      `api/v1/productos/inventario/?desde=0&limite=50`
    );

    const { total, inventario } = await resp.json();

    if (resp.ok) {
      dispatch(agregarProductos(inventario));
    }
  };
};

export const cargarProveedores = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `api/v1/usuarios/?desde=0&hasta=100&rol=productor`
    );
    const respPoint = await fetchConToken(`api/v1/puntos/?desde=0&hasta=100`);

    const { usuarios } = await resp.json();
    const { puntos } = await respPoint.json();

    if (resp.ok && respPoint.ok) {
      dispatch({
        type: TYPES.ADD_SUPPLIER,
        payload: { usuarios, puntos },
      });
    }
  };
};

export const cargarProductos = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`api/v1/productos/proveedor/${id}`);

    const { productos } = await resp.json();

    if (resp.ok) {
      dispatch({
        type: TYPES.SUPPLIER_PRODUCTS,
        payload: productos,
      });
    }
  };
};

export const productoSeleccionado = (id) => ({
  type: TYPES.PRODUCT_SELECTED,
  payload: id,
});

/* const cargarProveedores = async () => {
  const resp = await fetchConToken(
    `api/v1/usuarios/?desde=0&hasta=5&rol=productor`
  );
  const { total, usuarios } = await resp.json();

  if (resp.ok) {
     setSelects({ ...selects, usuarios });
      setLoading(false); 
    dispatch({
      type: TYPES.ADD_SUPPLIER,
      payload: usuarios,
    });
  }
}; */
export const cleanStock = () => ({
  type: TYPES.CLEAN_UP_STOCK,
});

const agregarProductos = (inventario) => ({
  type: TYPES.SHOW_STOCK,
  payload: inventario,
});
