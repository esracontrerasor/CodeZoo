import React, { useEffect, useState } from "react";
import "./css/StartEffect.css";

const StartEffect = ({ trigger }) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        if (trigger) {
            const newStars = Array.from({ length: 40 }).map((_, index) => ({
                id: index,
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                size: `${Math.random() * 15 + 5}px`, // Tamaño entre 5px y 20px
                color: ["gold", "yellow", "silver", "lightblue", "pink"][Math.floor(Math.random() * 5)], // Colores aleatorios
                animationDuration: `${Math.random() * 1.5 + 0.5}s`
            }));
            setStars(newStars);

            setTimeout(() => {
                setStars([]);
            }, 2000); // Se eliminan después de 2 segundos
        }
    }, [trigger]);

    return (
        <div className="stars-container">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.color,
                        animationDuration: star.animationDuration
                    }}
                />
            ))}
        </div>
    );
};

export default StartEffect;
