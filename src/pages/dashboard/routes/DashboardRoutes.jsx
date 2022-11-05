import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Cashier from "../Cashier";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pos" element={<Cashier />} />

      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};
