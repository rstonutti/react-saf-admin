//import { useContext } from 'react';

import { Navigate } from "react-router-dom";
//import { AuthContext } from '../auth/AuthContext';

const user = {
  logged: false,
};

export const PublicRoutes = ({ isLogged, children }) => {
  //const { user } = useContext(AuthContext )

  return isLogged ? <Navigate to="/" /> : children;
};
