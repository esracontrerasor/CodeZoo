import React, { act, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import CodeZooCat from "./CoodeZooCat";
import noti_1 from "./resources/notification_1.png";
import noti_2 from "./resources/notification_2.png";
import setting from "./resources/settings_1.png";
import setting_1 from "./resources/settings_2.png";
import avatar from "./resources/user_1.png";
import avatar_1 from "./resources/user_2.png";
import Navbar from "./components/navbar/Navbar";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [activeTab, setActiveTab] = useState("Juego");
  const [rotating, setRotating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mapTabTipo = {
    "Juego": "Juego",
    "Cuento": "Cuento",
    "Modo Libre": "Modo_Libre",
  };

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const tipo = mapTabTipo[activeTab];
        const response = await axios.get(`https://backend-codezoo.onrender.com/api/actividades/${tipo}`);
        console.log("Actividades recibidas:", response.data);
        setActividades(response.data);
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    };
    fetchActividades();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getContentByTab = () => {
    switch (activeTab) {
      case "JUEGOS":
        return games;
      case "CUENTOS":
        return cuentos;
      case "MODO LIBRE":
        return modoLibre;
      default:
        return games;
    }
  };


  const handleClick = (icon) => {
    if (icon === "menu") {
      if (rotating) return;
      setRotating(true);

      setTimeout(() => {
        if (selected === "menu") {
          setSelected(null);
          setShowPopup(false);
        } else {
          setSelected("menu");
          setShowPopup(true);
        }
        setRotating(false);
      }, 500);
    } else if (icon === "Notificaciones") {
      setShowNotifications(true);
      setShowPopup(false);
    } else if (icon === "Avatar") {
      navigate("/avatar");
    } else if (icon === "Settings") {
      navigate("/settings");
    } else {
      setSelected(icon);
      setShowPopup(true);
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      {/* Ventana emergente del menú */}
      {showPopup && (
        <div className="popup-container show">
          <div className="popup-content">
            <h3>Menú</h3>
            <div className="icon-container">
              <img src={selected === "Avatar" ? avatar_1 : avatar} alt="Avatar" onClick={() => handleClick("Avatar")} />
              <span>Perfil</span>
            </div>
            <div className="icon-container">
              <img src={selected === "Notificaciones" ? noti_2 : noti_1} alt="Notificaciones" onClick={() => handleClick("Notificaciones")} />
              <span>Notificaciones</span>
            </div>
            <div className="icon-container">
              <img src={selected === "Settings" ? setting_1 : setting} alt="Settings" onClick={() => handleClick("Settings")} />
              <span>Configuración</span>
            </div>
          </div>
        </div>
      )}

      <div className="contenido-principal">

        <h1 className="activities-title">ACTIVIDADES</h1>
        <div className="tab-container">
          {["Juego", "Cuento", "Modo Libre"].map((tab) => (
            <button key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => handleTabChange(tab)}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="games-container">
          {actividades.map((item, index) => (
            <div key={index} className="games-card" onClick={() => navigate(item.ruta)}>
              <img src={item.imagen} className="games-img" />
              <div className="games-title">{item.titulo}</div>
            </div>
          ))}
          <CodeZooCat />
        </div>

      </div>


    </div>
  );
};

export default Home;
