import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ isLogged, children }) => {
  return isLogged ? <Navigate to="/" /> : children;
};
