//import { useContext } from 'react';

import { Navigate } from "react-router-dom";
//import { AuthContext } from '../auth/AuthContext';

const user = {
  logged: false,
};

export const PublicRoutes = ({ children }) => {
  //const { user } = useContext(AuthContext )

  return user.logged ? <Navigate to="/" /> : children;
};
