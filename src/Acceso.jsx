import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Acceso.css";
import background from "./resources/fondo.png";
import oso from "./resources/bear-thinking-character-style-cartoon-vector-14196134.jpg";

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
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <div className="container">
        <div className="card">
          <h2>Parents only</h2>
          <p>To continue, please enter the correct answer</p>
          <h3>
            {num1} x {num2} = ?
          </h3>
          <input
            type="text"
            value={answer}
            onChange={handleInputChange}
            maxLength={2}
            className="answer-input"
          />
          <button onClick={handleSubmit} disabled={!isCorrect}>
            SUBMIT
          </button>
          <button onClick={generateNewMultiplication} className="reset-btn">
            New Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeZooWelcome;
