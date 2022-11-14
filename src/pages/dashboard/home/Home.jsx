import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import "./home.scss";
import { useEffect, useMemo, useState } from "react";
import { fetchSinToken } from "../../../helpers/fetch";
import Spinner from "../../../components/spinner/Spinner";

const Home = () => {
  const [chart, setChart] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [semana, setSemana] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarStats = async () => {
    const resp = await fetchSinToken(`api/v1/ordenes/stats`);

    const { seisMeses, anteriorActualMes, esteDia, estaSemana } =
      await resp.json();

    if (resp.ok) {
      setChart(seisMeses);
      setIngresos(
        anteriorActualMes.sort((a, b) =>
          a._id > b._id ? 1 : b._id > a._id ? -1 : 0
        )
      );
      setSemana(estaSemana);
      setFeatures(esteDia);
      setLoading(false);
    }
  };
  useEffect(() => {
    cargarStats();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home">
      {chart.length && ingresos.length && semana.length ? (
        <div className="homeContainer">
          <div className="widgets">
            <Widget type="usuarios" />
            <Widget type="productos" valores={ingresos} />
            <Widget type="ordenes" valores={ingresos} />
            <Widget type="ingresos" valores={ingresos} />
          </div>
          <div className="charts">
            <Featured
              dia={features.length ? features : [{ total: 0 }]}
              mes={ingresos}
              semana={semana}
            />
            <Chart
              title="Ingresos de los ultimos 6 meses"
              chartStats={chart}
              aspect={2 / 1}
            />
          </div>
        </div>
      ) : (
        <div className="homeContainer">
          <div className="stats">No hay estadisticas disponibles</div>
        </div>
      )}
    </div>
  );
};

export default Home;
