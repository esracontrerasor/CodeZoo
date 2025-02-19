import React, { useState, useEffect } from "react";

const imagenes = [
    { id: "mono", src: "src/resources/Mem/A.jpg" },
    { id: "leon", src: "src/resources/Mem/B.jpg" },
    { id: "oso", src: "src/resources/Mem/C.jpg" },
    { id: "cocodrilo", src: "src/resources/Mem/D.jpg" },
    { id: "jirafa", src: "src/resources/Mem/E.jpg" },
    { id: "cerdo", src: "src/resources/Mem/F.jpg" },
    { id: "vaca", src: "src/resources/Mem/G.jpg" },
    { id: "elefante", src: "src/resources/Mem/H.jpg" }
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
            } else {
                setTimeout(() => {
                    setCartas(prevCartas => prevCartas.map(carta => 
                        carta.encontrada ? carta : { ...carta, volteada: false }
                    ));
                }, 1000);
            }

            setTimeout(() => {
                setSeleccionadas([]);
                setBloqueado(false);
            }, 1000);
        }
    }, [seleccionadas]);

    useEffect(() => {
        if (cartas.every(carta => carta.encontrada)) {
            setGanador(true);
        }
    }, [cartas]);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Memorama</h1>
            {ganador && <h2>¡Felicidades! Has ganado 🎉</h2>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 100px)", gap: "10px", justifyContent: "center", margin: "auto", width: "fit-content" }}>
                {cartas.map(carta => (
                    <div key={carta.idUnico} 
                        onClick={() => !carta.volteada && manejarClick(carta.idUnico)} 
                        style={{
                            width: "100px",
                            height: "100px",
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
        </div>
    );
};

export default Memorama;
