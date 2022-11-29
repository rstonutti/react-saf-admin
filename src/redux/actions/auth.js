import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { TYPES } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (correo, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "api/v1/auth/login",
      { correo, password },
      "POST"
    );
    const { usuario, token, msg } = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login(usuario));
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("api/v1/auth/renew");
    const { usuario, token } = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login(usuario));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const login = (user) => ({
  type: TYPES.LOGIN,
  payload: user,
});

const checkingFinish = () => ({ type: TYPES.CHECKING });

const logout = () => ({ type: TYPES.LOGOUT });
