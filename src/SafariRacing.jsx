import { useState, useEffect } from "react";

export default function CarreraDeAutos() {
    const [pos1, setPos1] = useState(0); // Jugador (Auto Rojo)
    const [pos2, setPos2] = useState(0); // Computadora (Auto Azul)
    const [winner, setWinner] = useState(null);
    const [boost, setBoost] = useState(3); // Número de boosts disponibles para el jugador
    const meta = typeof window !== "undefined" ? window.innerWidth * 0.75 : 500;

    useEffect(() => {
    
        const handleKeyDown = (event) => {
            if (winner) return;
            if (event.key.toLowerCase() === "a") {
                console.log("Posición Rojo:", pos1, "Posición Azul:", pos2);
                setPos1(prev => {
                    if (prev + 10 >= meta) {
                        setWinner("Jugador 1");
                        return meta;
                    }
                    return prev + 10;
                });
            }
            if (event.key.toLowerCase() === "s" && boost > 0) { // Tecla "S" para usar boost
                setBoost(prev => prev - 1);
                setPos1(prev => Math.min(prev + 50, meta));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [winner, boost]);

    useEffect(() => {
        if (winner) return;
        const interval = setInterval(() => {
            setPos2(prev => {
                const avance = Math.random() * 35 + 5; // Movimiento aleatorio entre 5 y 35 px
                if (prev + avance >= meta) {
                    setWinner("Computadora");
                    clearInterval(interval);
                    return meta;
                }
                return prev + avance;
            });
        }, Math.random() * 200 + 200); // La computadora varía su velocidad

        return () => clearInterval(interval);
    }, [winner]);

    function reiniciar() {
        setPos1(0);
        setPos2(0);
        setWinner(null);
        setBoost(3);
    }

    return (
        <div className="text-center font-sans min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('src/resources/safari-fondo.jpg')" }}>
            <h1 className="text-2xl font-bold">Safari Racing</h1>
            <p className="mb-4">Jugador 1: Presiona "A" para avanzar | "S" para boost ({boost} restantes)</p>
            <div className="w-4/5 h-16 border-2 border-black relative mx-auto my-4">
                <img src="src/resources/jeep.jpg" alt="Auto Rojo" className="w-12 h-8 absolute top-4"
    style={{ transform: `translateX(${pos1}px)` }} />
            </div>
            <div className="w-4/5 h-16 border-2 border-black relative mx-auto my-4">
            <img src="src/resources/jeep.jpg" alt="Auto Azul"  className="w-12 h-8 absolute top-4"
    style={{ transform: `translateX(${pos2}px)` }} />
            </div>
            {winner && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold text-green-600">🎉 ¡{winner} gana! 🎉</h2>
                    <button onClick={reiniciar} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Reiniciar</button>
                </div>
            )}
        </div>
    );
}
