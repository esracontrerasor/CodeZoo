import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import aventura from "./resources/aventura_jungla.jpeg";
import delfines from "./resources/delfines_mamalones.jpg";
import algoritmos from "./resources/algoritmos.jpg";
import CodeZooCat from "./CoodeZooCat";
import noti_1 from "./resources/notification_1.png";
import noti_2 from "./resources/notification_2.png";
import setting from "./resources/settings_1.png";
import setting_1 from "./resources/settings_2.png";
import Bur_1 from "./resources/list-2.png";
import Bur_2 from "./resources/list.png";
import avatar from "./resources/user_1.png";
import avatar_1 from "./resources/user_2.png";

const games = [
  { title: "Aventura en la Jungla", image: "aventura.jpg", route: "/book/zoologico" },
  { title: "Código Marino", image: delfines, duration: "15 min", level: "Intermedio", route:"/memorama" },
  { title: "Safari de Algoritmos", image: algoritmos, duration: "20 min", level: "Difícil" },
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
      <div className="header-home">
        <h1 className="logho">CodeZoo</h1>
        <div className="search-bar">
          <input type="text" placeholder="Buscar juego..." />
        </div>
        <img
          src={selected === "menu" ? Bur_2 : Bur_1}
          alt="Menu"
          className={`icon-image ${rotating ? "rotate" : ""}`}
          onClick={() => handleClick("menu")}
        />
      </div>

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

      {/* Ventana emergente de Notificaciones */}
      {showNotifications && (
        <div className="popup-container show">
          <div className="popup-content">
            <h3>Notificaciones</h3>
            <p>Aquí aparecerán tus notificaciones más recientes.</p>
            <button onClick={() => setShowNotifications(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Categorías de juegos */}
      <div className="categories">
        <button className="category-btn">🦁 Aventura</button>
        <button className="category-btn">🐳 Océano</button>
        <button className="category-btn">🦓 Safari</button>
      </div>

      {/* Grid de juegos */}
      <div className="games-grid">
        {games.map((game, index) => (
          <div 
            key={index} 
            className="game-card" 
            onClick={() => navigate(game.route)}
          >
            <img src={game.image} alt={game.title} className="game-image" />
            <h3 className="game-title">{game.title}</h3>
            <p className="game-info">{game.duration} - {game.level}</p>
          </div>
        ))}
      </div>

      {/* Asistente Gato */}
      <CodeZooCat />
    </div>
  );
};

export default Home;
