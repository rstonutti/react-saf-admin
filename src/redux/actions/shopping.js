import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { TYPES } from "../types/types";
import Swal from "sweetalert2";
import { getAmount } from "../../helpers/amount";

export const cargarProductos = (designado) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      `api/v1/productos?desde=0&limite=20&punto=${designado}`
    );

    const { productos, categorias } = await resp.json();

    if (resp.ok) {
      dispatch(agregarProductos(productos, categorias));
    }
  };
};

export const addCart = (id, designado) => ({
  type: TYPES.ADD_TO_CART,
  payload: { id, punto: designado },
});

export const createOrden = (designado, cart) => ({
  type: TYPES.CREATE_ORDER,
  payload: { designado, montoTotal: getAmount(cart) },
});

export const submitOrder = (cart, orden) => {
  return async (dispatch) => {
    if (cart.length != 0) {
      const resp = await fetchConToken(
        "api/v1/ordenes",
        { cart, orden },
        "POST"
      );

      if (resp.ok) {
        console.log("éxito");
        dispatch({
          type: TYPES.SUBMIT_ORDER,
        });
        //AGREGAR UNA NOTIFICACIÓN DE ÉXITO
      }
    } else {
      //AGREGAR UNA NOTIFICACIÓN DE CARRITO VACIO
      console.log("carrito vacio");
    }
  };
};

export const filterProducts = (categoria) => {
  return async (dispatch) => {
    categoria === "clear"
      ? dispatch({
          type: TYPES.CLEAR_FILTER_PRODUCT,
        })
      : dispatch({
          type: TYPES.FILTER_PRODUCT,
          payload: categoria,
        });
  };
};

export const delFromCart = (id, designado, all = false) => {
  return async (dispatch) => {
    if (all) {
      dispatch({
        type: TYPES.REMOVE_ALL_FROM_CART,
        payload: { id, punto: designado },
      });
    } else {
      dispatch({
        type: TYPES.REMOVE_ONE_FROM_CART,
        payload: { id, punto: designado },
      });
    }
  };
};

export const clearCart = () => ({
  //setCambio(efectivoInitial);

  type: TYPES.CLEAR_CART,
});

export const cleanUp = () => ({
  //setCambio(efectivoInitial);

  type: TYPES.CLEAN_UP,
});

export const getRemaining = (cambio) => ({
  type: TYPES.REMAINING,
  payload: cambio,
});

const agregarProductos = (productos, categorias) => ({
  type: TYPES.ADD_PRODUCT,
  payload: { productos, categorias },
});
