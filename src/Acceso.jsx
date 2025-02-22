import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Acceso.css";

const CodeZooWelcome = () => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateNewMultiplication();
  }, []);

  const generateNewMultiplication = () => {
    const newNum1 = Math.floor(Math.random() * 9) + 1;
    const newNum2 = Math.floor(Math.random() * 9) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer("");
    setIsCorrect(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAnswer(value);
      setIsCorrect(parseInt(value) === num1 * num2);
    }
  };

  const handleSubmit = () => {
    if (isCorrect) {
      navigate("/terminos");
    }
  };

  return (
    <div className="app">
      <div className="contenedor-acceso contenedor">

        <div className="imagen-acceso">

        </div>

        <div className="card">
          <h2>Solo padres</h2>
          <p>Para continuar, por favor ingrese el resultado correcto:</p>

          <div className="pregunta-acceso">
            <h3> {num1} x {num2} = ? </h3>
            <input type="text" value={answer} onChange={handleInputChange} maxLength={2} className="answer-input"/>
          </div>
          
          <div className="boton-acceso">
            <button onClick={handleSubmit} disabled={!isCorrect}>ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeZooWelcome;
