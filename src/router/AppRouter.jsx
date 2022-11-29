import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes";
import { DashboardRoutes } from "../pages/dashboard/routes/DashboardRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { startChecking } from "../redux/actions/auth";
import Spinner from "../components/spinner/Spinner";
import PosRouter from "../pages/dashboard/routes/PosRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Spinner />;
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
        <Route
          path="/pos/*"
          element={
            <PrivateRoutes isLogged={!!uid}>
              <PosRouter />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
