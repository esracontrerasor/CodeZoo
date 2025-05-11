import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import sopaDeLetrasImg from "./resources/cartoon animals playing a word search game.png";
import memoramaImg from "./resources/cartoon animals playing memorama.png";
import safariracing from "./resources/safari-racing.jpeg";
import LibrosImg from "./resources/Libros.png";
import CodeZooCat from "./CoodeZooCat";
import noti_1 from "./resources/notification_1.png";
import noti_2 from "./resources/notification_2.png";
import setting from "./resources/settings_1.png";
import setting_1 from "./resources/settings_2.png";
import avatar from "./resources/user_1.png";
import avatar_1 from "./resources/user_2.png";
import Navbar from "./components/navbar/Navbar";
import ZoologicoNombres from "./resources/cuento1_img.png";
import freeModeIMG from "./resources/freemode_icon.png";
import { get } from "mongoose";

const games = [
  { title: "Sopa de Letras", image: sopaDeLetrasImg, information: "Juego interactivo donde encontrarás palabras clave relacionadas con la programación. Al descubrir cada palabra, recibirán una breve explicación de su significado.", route: "/sopa-de-letras" },
  { title: "Memorama", image: memoramaImg, information: "Juego de memoria donde encontrarás cartas con términos de programación y su significado. Al encontrar la pareja correcta, se mostrará una breve explicación.", route:"/memorama" },
  { title: "Safari racing", image: safariracing, information:"Juego de carreras donde compites con la máquina para ser el primero en llegar a la meta. Presiona la tecla rápidamente para hacer que avance tu carro.", route:"/safari-racing" },
];

const cuentos = [
  { title: "El Zoologico de Nombres", image:ZoologicoNombres, information:"Un cuentito de un zoológico de nombres" , route:"/libro/libro-1" },
  { title: "El Inventario de la Jungla", image:LibrosImg, information:"Un cuentito de un inventario de la jungla", route: "/libro/libro-2" },
];

const modoLibre = [
  {title: "Modo libre", image: freeModeIMG ,route : "/libre"},
];


const Home = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("JUEGOS");
  
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

  const [rotating, setRotating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
            <button 
            className={`tab ${activeTab === "JUEGOS" ? "active" : ""}`}
            onClick={() => handleTabChange("JUEGOS")}
            >
              JUEGOS
            </button>
            <button 
            className={`tab ${activeTab === "CUENTOS" ? "active" : ""}`}
            onClick={() => handleTabChange("CUENTOS")}
            >
              CUENTOS
            </button>
            <button 
            className={`tab ${activeTab === "MODO LIBRE" ? "active" : ""}`}
            onClick={() => handleTabChange("MODO LIBRE")}
            >MODO LIBRE
            </button>
          </div>
 
          <div className="games-container">
            {getContentByTab().map((item, index) => (
              <div key={index} className="games-card" onClick={() => navigate(item.route)}>
                <img src={item.image} className="games-img"/>
                <div className="games-title">{item.title}</div>
              </div>
            ))}
            <CodeZooCat />
          </div>

      </div>

       
    </div>
  );
};

export default Home;
