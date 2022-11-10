import "./inventory.scss"
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

const Inventory = () => {
    return (
        <div className="stock">
            <Sidebar />
            <div className="stock-container">
                <Navbar />
                Inventario
            </div>
        </div>
    )
}

export default Inventory;