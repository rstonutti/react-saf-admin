import { Navigate, Route, Routes } from "react-router-dom";
import Cashier from "../cashier/Cashier";

const PosRouter = () => {
  return (
    <Routes>
      <Route path="/pos" element={<Cashier />} />
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default PosRouter;
