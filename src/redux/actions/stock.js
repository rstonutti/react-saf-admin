import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { TYPES } from "../types/types";
import Swal from "sweetalert2";

export const cargarInventario = (designado) => {
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

const agregarProductos = (inventario) => ({
  type: TYPES.SHOW_STOCK,
  payload: inventario,
});
