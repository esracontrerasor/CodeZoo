import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import aventura from "./resources/aventura_jungla.jpeg";
import delfines from "./resources/delfines_mamalones.jpg";
import algoritmos from "./resources/algoritmos.jpg";
const games = [
  {
    title: "Aventura en la Jungla",
    image: aventura,
    duration: "10 min",
    level: "Fácil",
  },
  {
    title: "Código Marino",
    image: delfines,
    duration: "15 min",
    level: "Intermedio",
  },
  {
    title: "Safari de Algoritmos",
    image: algoritmos,
    duration: "20 min",
    level: "Difícil",
  },
];

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(`/game/${game.title}`)}>
      <img src={game.image} alt={game.title} className="game-image" />
      <h3 className="game-title">{game.title}</h3>
      <p className="game-info">
        {game.duration} - {game.level}
      </p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="logo">CodeZoo</h1>
        <div className="search-bar">
          <input type="text" placeholder="Buscar juego..." />
        </div>
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
    </div>
  );
};

export default Home;
