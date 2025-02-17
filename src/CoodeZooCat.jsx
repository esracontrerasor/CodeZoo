import React, { useEffect, useState } from "react";
import "./css/CodeZooCat.css";
import catImage1 from "./resources/cat_assistant.png";
import catImage2 from "./resources/cat_assistant_alt.png";
import OpenSound from "./resources/Sounds/cartoon-balloon-being-blown-up-02-186982.mp3";
import CloseSound from "./resources/Sounds/pop2-84862.mp3";
import popImage from "./resources/pop.png"; // Imagen del efecto pop

const messages = [
  "Recuerda siempre probar tu código con diferentes casos de prueba. 🧐",
  "Los bucles son geniales, pero ¡cuidado con los infinitos! ♾️",
  "Divide un problema grande en partes pequeñas para resolverlo mejor. 🔍",
  "¿Sabías que las funciones ayudan a reutilizar código? 📌",
  "Si tienes dudas, imprimir variables con console.log() puede ayudar. 🖥️"
];

const CodeZooCat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(messages[0]);
  const [catImage, setCatImage] = useState(catImage1);
  const [showPop, setShowPop] = useState(false); // Para manejar la imagen del "pop"

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const toggleImage = () => {
    const sound = new Audio(isOpen ? CloseSound : OpenSound);
    sound.play();

    if (isOpen) {
      setShowPop(true); // Mostrar imagen de "pop"
      setTimeout(() => {
        setShowPop(false); // Ocultar imagen después de un tiempo
      }, 300);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    setCatImage((prevImage) => (prevImage === catImage1 ? catImage2 : catImage1));
  };

  return (
    <div className="codezoo-cat-container" onClick={toggleImage}>
      <img src={catImage} alt="Asistente CodeZoo" className="cat-image" />
      {isOpen && (
        <div className="cat-bubble">
          <p>{message}</p>
        </div>
      )}
      {showPop && <img src={popImage} alt="Pop Effect" className="pop-effect" />}
    </div>
  );
};

export default CodeZooCat;
