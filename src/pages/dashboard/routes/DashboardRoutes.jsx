import { Navigate, Route, Routes } from "react-router-dom";
import AddInventory from "../inventory/AddInventory";
import Home from "../home/Home";
import Inventory from "../inventory/Inventory";
import Navbar from "../../../components/navbar/Navbar";
import Order from "../order/Order";
import Sidebar from "../../../components/sidebar/Sidebar";

import "./dasboardRoutes.scss";

export const DashboardRoutes = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ordenes" element={<Order />} />
          <Route path="/stock" element={<Inventory />} />
          <Route path="/stock/nuevo" element={<AddInventory />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
