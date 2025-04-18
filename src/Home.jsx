import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import sopaDeLetrasImg from "./resources/cartoon animals playing a word search game.png";
import memoramaImg from "./resources/cartoon animals playing memorama.png";
import safariracing from "./resources/safari-racing.jpeg";
import CodeZooCat from "./CoodeZooCat";
import noti_1 from "./resources/notification_1.png";
import noti_2 from "./resources/notification_2.png";
import setting from "./resources/settings_1.png";
import setting_1 from "./resources/settings_2.png";
import avatar from "./resources/user_1.png";
import avatar_1 from "./resources/user_2.png";
import Navbar from "./components/navbar/navbar";

const games = [
  { title: "Sopa de Letras", image: sopaDeLetrasImg, information: "Juego interactivo donde encontrarás palabras clave relacionadas con la programación. Al descubrir cada palabra, recibirán una breve explicación de su significado.", route: "/sopa-de-letras" },
  { title: "Memorama", image: memoramaImg, information: "Juego de memoria donde encontrarás cartas con términos de programación y su significado. Al encontrar la pareja correcta, se mostrará una breve explicación.", route:"/memorama" },
  { title: "Safari racing", image: safariracing, information:"Juego de carreras donde compites con la máquina para ser el primero en llegar a la meta. Presiona la tecla rápidamente para hacer que avance tu carro.", route:"/safari-racing" },
];


const Home = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const gameClick = () => {
    if (game.title === "Aventura en la Jungla") {
      navigate("/sopa-de-letras"); // Redirige a la sopa de letras
    } else {
      navigate(`/game/${game.title}`);
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
            <button class="tab">JUEGOS</button>
            <button class="tab">CUENTOS</button>
            <button class="tab">MODO LIBRE</button>
          </div>

          <div className="games-container">
            {games.map((game, index) => (
              <div key={index} className="games-card" onClick={() => navigate(game.route)}>
                <img src={game.image} className="games-img"/>
                <div className="games-title">{game.title}</div>
              </div>
            ))}
            <CodeZooCat />
          </div>

      </div>

       
    </div>
  );
};

export default Home;
