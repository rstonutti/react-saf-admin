import "./inventory.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchSinToken } from "../../../helpers/fetch";
import { capitalizeFirstLetter } from "../../../helpers/capitalize-first-letter";
import Spinner from "../../../components/spinner/Spinner";

const inventoryColumns = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
    width: 50,
  },
  {
    field: "productos",
    headerName: "Producto",
    flex: 3,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <Image
            className="cellImg"
            cloudName="dawjd5cx8"
            publicId={params.row.img}
            alt="avatar"
          >
            <Transformation
              height="30"
              width="30"
              radius="max"
              aspectRatio="1.5"
              crop="fill"
            />
          </Image>
          {capitalizeFirstLetter(params.row.nombre.toLowerCase())}
        </div>
      );
    },
  },
  {
    field: "categoria",
    headerName: "Categoría",
    /*     renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {capitalizeFirstLetter(params.row.categoria.toLowerCase())}
        </div>
      );
    }, */
    flex: 1.5,
  },
  {
    field: "lote",
    headerName: "LOTE",
    flex: 1,
  },
  {
    align: "center",
    headerAlign: "center",
    field: "cantidad",
    headerName: "Cantidad",
    flex: 1,
  },
  {
    field: "punto",
    headerName: "Destino",
    flex: 2,
  },
  {
    field: "proveedor",
    headerName: "Proveedor",
    flex: 1.5,
  },
  /* {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  }, */
];

const Inventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarInventario = async () => {
    const resp = await fetchSinToken(
      `api/v1/productos/inventario/?desde=0&limite=50`
    );

    const { total, inventario } = await resp.json();

    if (resp.ok) {
      setData(inventario);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      align: "center",
      headerAlign: "center",
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Ver</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="stock">
      <div className="stock-container">
        <div className="datatable">
          <div className="datatableTitle">
            Inventario
            <Link to="/stock/nuevo" className="link">
              Agregar
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={inventoryColumns.concat(actionColumn)}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
