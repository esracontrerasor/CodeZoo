import SidebarMenu from './components/SidebarMenu';
import './css/graficasDashboard.css';
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardGraficas = () => {
  const [foroPorMes, setForoPorMes] = useState(null);
  const [promedioProgreso, setPromedioProgreso] = useState(0);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // FORO
        const foroResponse = await axios.get("https://backend-codezoo.onrender.com/api/foro");
        const preguntas = foroResponse.data;

        const conteoPorMes = {};
        preguntas.forEach(p => {
          const fecha = new Date(p.fecha);
          const mes = fecha.toLocaleString("default", { month: "short", year: "numeric" });
          conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1;
        });

        const foroLabels = Object.keys(conteoPorMes);
        const foroValues = Object.values(conteoPorMes);

        setForoPorMes({
          labels: foroLabels,
          datasets: [{
            label: "Preguntas por mes",
            data: foroValues,
            backgroundColor: "#42a5f5",
            borderRadius: 8
          }]
        });

        // USUARIOS
    const usuariosResponse = await axios.get("https://backend-codezoo.onrender.com/api/usuarios");
    const usuarios = usuariosResponse.data;
    const estudiantes = usuarios.filter(u => u.rol === "estudiante");

    const totalProgreso = estudiantes.reduce((sum, u) => {
    const prog = u.progreso?.porcentaje || 0;
    return sum + prog;
    }, 0);

    const promedio = estudiantes.length ? +(totalProgreso / estudiantes.length).toFixed(1) : 0;
    setPromedioProgreso(promedio);



      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="dashboard-layout">
        <SidebarMenu />
        <div className="dashboard-content">
        <h2>Estadísticas del Sistema</h2>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
  <div className="grafica-card">
    <h3>Preguntas en el foro</h3>
    {foroPorMes ? <Bar data={foroPorMes} /> : <p>Cargando...</p>}
  </div>

  <div className="grafica-card">
    <h3>Promedio de progreso</h3>
    {promedioProgreso !== null ? (
      <Bar
        data={{
          labels: ["Estudiantes"],
          datasets: [
            {
              label: "Progreso promedio (%)",
              data: [promedioProgreso],
              backgroundColor: "#66bb6a",
              borderRadius: 8,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          scales: {
            x: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Porcentaje",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    ) : (
      <p>Cargando...</p>
    )}
  </div>
</div>

        </div>
    </div>
    );
};

export default DashboardGraficas;
