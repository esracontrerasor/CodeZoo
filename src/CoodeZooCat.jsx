import React, { useEffect, useState } from "react";
import "./css/CodeZooCat.css";
import catImage1 from "./resources/cat_one.gif";
import catImage2 from "./resources/cat_two.gif";

import OpenSound from "./resources/Sounds/cartoon-balloon-being-blown-up-02-186982.mp3";
import CloseSound from "./resources/Sounds/pop2-84862.mp3";
import popImage from "./resources/pop.png"; // Imagen del efecto pop

const mensajesPorContexto = {
  general: [
    "Recuerda siempre probar tu código con diferentes casos de prueba. 🧐",
    "Los bucles son geniales, pero ¡cuidado con los infinitos! ♾️",
    "Divide un problema grande en partes pequeñas para resolverlo mejor. 🔍",
    "¿Sabías que las funciones ayudan a reutilizar código? 📌",
    "Si tienes dudas, imprimir variables con console.log() puede ayudar. 🖥️"
  ],
  memorama: "¡Encuentra los pares y aprende sobre los animales! 🐾",
};

const CodeZooCat = ({ contexto = "general", customMessage, isOpen }) => {
  const [message, setMessage] = useState(
    customMessage || mensajesPorContexto[contexto] || mensajesPorContexto.general[0]
  );
  const [catImage, setCatImage] = useState(catImage1);

  useEffect(() => {
    setMessage(customMessage || mensajesPorContexto[contexto]);
  }, [customMessage, contexto]);

  return (
    <div className="codezoo-cat-container">
      <img src={catImage} alt="Asistente CodeZoo" className="cat-image" />
      {isOpen && <div className="cat-bubble"><p>{message}</p></div>}
    </div>
  );
};

export default CodeZooCat;
