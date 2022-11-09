import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

import { AuthRoutes } from "../pages/auth/routes/AuthRoutes";
import { DashboardRoutes } from "../pages/dashboard/routes/DashboardRoutes";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { fetchConToken } from "../helpers/fetch";

export const AppRouter = () => {
  const {
    state: { checking, uid },
    dispatch,
  } = useContext(AuthContext);

  const startChecking = async (dispatch) => {
    const resp = await fetchConToken("api/v1/auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch({
        type: "LOGIN",
        payload: body.usuario,
      });
    } else {
      console.log(body.msg);

      dispatch({
        type: "CHECKING",
      });
    }
  };

  useEffect(() => {
    //funcion para comprobar que el token sea válido - de momento no lo necesito
    startChecking(dispatch);
  }, [dispatch]);

  if (checking) {
    return <div>Chequeando querido</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isLogged={!!uid}>
              <AuthRoutes />
            </PublicRoutes>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoutes isLogged={!!uid}>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
