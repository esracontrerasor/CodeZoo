import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import aventura from "./resources/aventura_jungla.jpeg";
import delfines from "./resources/delfines_mamalones.jpg";
import algoritmos from "./resources/algoritmos.jpg";
import CodeZooCat from "../src/CoodeZooCat";
import noti_1 from "./resources/notification_1.png";
import noti_2 from "./resources/notification_2.png";
import setting from "./resources/settings_1.png";
import setting_1 from "./resources/settings_2.png";
import avatar from "./resources/user_1.png";
import avatar_1 from "./resources/user_2.png";

const games = [
  { title: "Aventura en la Jungla", image: aventura, duration: "10 min", level: "Fácil" },
  { title: "Código Marino", image: delfines, duration: "15 min", level: "Intermedio" },
  { title: "Safari de Algoritmos", image: algoritmos, duration: "20 min", level: "Difícil" },
];

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  return (
    <div className="game-card" onClick={() => navigate(`/game/${game.title}`)}>
      <img src={game.image} alt={game.title} className="game-image" />
      <h3 className="game-title">{game.title}</h3>
      <p className="game-info">{game.duration} - {game.level}</p>
    </div>
  );
};

const Home = () => {
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (icon) => {
    if (selected === icon) {
      setSelected(null);
      setShowPopup(false);
    } else {
      setSelected(icon);
      setShowPopup(true);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="logho">CodeZoo</h1>
        <div className="search-bar">
          <input type="text" placeholder="Buscar juego..." />
        </div>
        <img
          src={selected === "notification" ? noti_2 : noti_1}
          alt="notification"
          className={`icon-image ${selected === "notification" ? "selected" : ""}`}
          onClick={() => handleClick("notification")}
        />
        <img
          src={selected === "avatar" ? avatar_1 : avatar}
          alt="avatar"
          className={`icon-image ${selected === "avatar" ? "selected" : ""}`}
          onClick={() => handleClick("avatar")}
        />
        <img
          src={selected === "settings" ? setting_1 : setting}
          alt="settings"
          className={`icon-image ${selected === "settings" ? "selected" : ""}`}
          onClick={() => handleClick("settings")}
        />
      </div>

      {/* Ventanilla emergente con animación */}
      <div className={`popup-container ${showPopup ? "show" : ""}`}>
        {selected && (
          <div className="popup-content">
            <h3>
              {selected === "notification" ? "Notificaciones" : selected === "avatar" ? "Perfil" : "Configuración"}
            </h3>
            <p>Contenido de {selected}</p>
          </div>
        )}
      </div>

      {/* Categorías de juegos */}
      <div className="categories">
        <button className="category-btn">🦁 Aventura</button>
        <button className="category-btn">🐳 Océano</button>
        <button className="category-btn">🦓 Safari</button>
      </div>

      {/* Grid de juegos */}
      <div className="games-grid">
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      {/* Asistente Gato */}
      <CodeZooCat />
    </div>
  );
};

export default Home;
