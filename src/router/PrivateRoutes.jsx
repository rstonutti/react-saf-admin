//import { useContext } from 'react';

import { Navigate } from "react-router-dom";
//import { AuthContext } from '../auth/AuthContext';

const user = {
  logged: false,
};

export const PrivateRoutes = ({ isLogged, children }) => {
  //const { user } = useContext(AuthContext )

  return isLogged ? children : <Navigate to="auth/login" />;
};
