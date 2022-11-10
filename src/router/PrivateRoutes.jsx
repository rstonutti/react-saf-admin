import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ isLogged, children }) => {
  return isLogged ? children : <Navigate to="auth/login" />;
};
