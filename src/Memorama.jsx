import React, { useState, useEffect } from "react";

import CodeZooCat from "../src/CoodeZooCat";
import StartEffect from "../src/StartEffect";
const imagenes = [
    { id: "mono", src: "src/resources/Mem/A.jpg", info: "El mono es ágil e inteligente, igual que 'if', que toma decisiones dependiendo de una condición. 🐵" },
    { id: "leon", src: "src/resources/Mem/B.jpg", info: "El león es el rey de la selva, así como 'else' gobierna cuando la condición de 'if' no se cumple. 🦁" },
    { id: "oso", src: "src/resources/Mem/C.jpg", info: "Los osos hibernan todo el invierno, igual que 'do' ejecuta su código al menos una vez antes de verificar la condición. 🐻" },
    { id: "cocodrilo", src: "src/resources/Mem/D.jpg", info: "El cocodrilo espera pacientemente bajo el agua, como 'while', que repite su código hasta que la condición cambia. 🐊" },
    { id: "jirafa", src: "src/resources/Mem/E.jpg", info: "Las jirafas son altas y metódicas, como 'for', que repite un bloque de código un número definido de veces. 🦒" },
    { id: "cerdo", src: "src/resources/Mem/F.jpg", info: "Los cerdos son curiosos y exploran opciones, igual que 'switch', que elige entre múltiples caminos. 🐷" },
    { id: "vaca", src: "src/resources/Mem/G.jpg", info: "Las vacas saben cuándo detenerse a descansar, igual que 'break', que interrumpe un bucle o estructura de control. 🐮" },
    { id: "elefante", src: "src/resources/Mem/H.jpg", info: "Los elefantes nunca olvidan su camino, igual que 'return' nos lleva de vuelta un resultado en una función. 🐘" }
];

const generarCartas = () => {
    const cartasDuplicadas = [...imagenes, ...imagenes]
        .sort(() => Math.random() - 0.5)
        .map((carta, index) => ({ ...carta, idUnico: index, volteada: false, encontrada: false }));

    return cartasDuplicadas;
};

const Memorama = () => {
    const [cartas, setCartas] = useState(generarCartas());
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [bloqueado, setBloqueado] = useState(false);
    const [ganador, setGanador] = useState(false);
    const [mensajeGato, setMensajeGato] = useState("");
    const [gatoVisible, setGatoVisible] = useState(false);
    const [mostrarEstrellas, setMostrarEstrellas] = useState(false);

    const manejarClick = (idUnico) => {
        if (bloqueado || seleccionadas.some(carta => carta.idUnico === idUnico)) return;

        const nuevaSeleccion = cartas.map(carta => 
            carta.idUnico === idUnico ? { ...carta, volteada: true } : carta
        );

        setCartas(nuevaSeleccion);
        setSeleccionadas([...seleccionadas, nuevaSeleccion.find(c => c.idUnico === idUnico)]);
    };

    useEffect(() => {
        if (seleccionadas.length === 2) {
            setBloqueado(true);  
            const [carta1, carta2] = seleccionadas;
    
            if (carta1.id === carta2.id) {
                setCartas(prevCartas => prevCartas.map(carta => 
                    carta.id === carta1.id ? { ...carta, encontrada: true } : carta
                ));
                setMensajeGato(`¡Buen trabajo! Has encontrado un par de ${carta1.id}. ${carta1.info}`);
                setGatoVisible(true);
                setMostrarEstrellas(true);

                setTimeout(() => {
                    setGatoVisible(false); // Mensaje visible por 40 segundos
                }, 10000); 

                setTimeout(() => setMostrarEstrellas(false), 2000); // Efecto de estrellas dura 2s
            } else {
                setMensajeGato("Oops, intenta de nuevo. 😕");
                setGatoVisible(true);
                
                setTimeout(() => {
                    setCartas(prevCartas => prevCartas.map(carta => 
                        carta.encontrada ? carta : { ...carta, volteada: false }
                    ));
                    setGatoVisible(false);
                }, 2000);
            }
    
            setTimeout(() => {
                setSeleccionadas([]);
                setBloqueado(false);
            }, 2000);
        }
    }, [seleccionadas]);
    

    useEffect(() => {
        if (cartas.every(carta => carta.encontrada)) {
            setGanador(true);
            setMensajeGato("¡Felicidades! Has encontrado todos los pares. 🎉");
            setGatoVisible(true);
        }
    }, [cartas]);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Memorama</h1>
            <CodeZooCat contexto="memorama" customMessage={mensajeGato} isOpen={gatoVisible} />
            {ganador && <h2>¡Felicidades! Has ganado 🎉</h2>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 200px)", gap: "10px", justifyContent: "center", margin: "auto", width: "fit-content" }}>
                {cartas.map(carta => (
                    <div key={carta.idUnico} 
                        onClick={() => !carta.volteada && manejarClick(carta.idUnico)} 
                        style={{
                            width: "200px",
                            height: "200px",
                            backgroundColor: carta.volteada || carta.encontrada ? "white" : "gray",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px solid black"
                        }}>
                        {carta.volteada || carta.encontrada ? <img src={carta.src} alt={carta.id} width="80" /> : "?"}
                    </div>
                ))}
            </div>
            <StartEffect trigger={mostrarEstrellas} />
        </div>
    );
};

export default Memorama;
