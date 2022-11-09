//import { useContext } from 'react';

import { Navigate } from "react-router-dom";
//import { AuthContext } from '../auth/AuthContext';

const user = {
  logged: false,
};

export const PrivateRoutes = ({ children }) => {
  //const { user } = useContext(AuthContext )

  return user.logged ? children : <Navigate to="auth/login" />;
};
