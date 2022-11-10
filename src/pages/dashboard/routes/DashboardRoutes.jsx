import { Navigate, Route, Routes } from "react-router-dom";
import Cashier from "../cashier/Cashier";
import Home from "../home/Home";
import Inventory from "../inventory/Inventory";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stock" element={<Inventory />} />
      <Route path="/pos" element={<Cashier />} />

      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};
