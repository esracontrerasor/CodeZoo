import React, { useEffect, useState } from "react";

function generarSopaDeLetras(tamano, palabras) {
    let sopa = new Array(tamano).fill(null).map(() => new Array(tamano).fill(' '));
    let posicionesPalabras = new Map();
    let direcciones = [[1, 0], [0, 1], [1, 1], [-1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1]];
    
    function colocarPalabra(palabra) {
        palabra = palabra.toUpperCase();
        let intentos = 0;
        while (intentos < 100) {
            let [dx, dy] = direcciones[Math.floor(Math.random() * direcciones.length)];
            let fila = Math.floor(Math.random() * tamano);
            let columna = Math.floor(Math.random() * tamano);

            if (
                fila + dx * (palabra.length - 1) >= 0 &&
                fila + dx * (palabra.length - 1) < tamano &&
                columna + dy * (palabra.length - 1) >= 0 &&
                columna + dy * (palabra.length - 1) < tamano
            ) {
                let puedeColocar = true;
                let posiciones = [];

                for (let i = 0; i < palabra.length; i++) {
                    let x = fila + i * dx, y = columna + i * dy;
                    if (sopa[x][y] !== " " && sopa[x][y] !== palabra[i]) {
                        puedeColocar = false;
                        break;
                    }
                    posiciones.push({ fila: x, columna: y });
                }

                if (puedeColocar) {
                    posiciones.forEach(({ fila, columna }, i) => {
                        sopa[fila][columna] = palabra[i];
                    });
                    posicionesPalabras.set(palabra, posiciones);
                    return;
                }
            }
            intentos++;
        }
    }

    palabras.forEach(colocarPalabra);

    for (let i = 0; i < tamano; i++) {
        for (let j = 0; j < tamano; j++) {
            if (sopa[i][j] === " ") {
                sopa[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
    return { sopa, posicionesPalabras };
}

const SopaDeLetras = () => {
    const palabras = ["JAVASCRIPT", "CODIGO", "LETRAS", "JUEGO", "PALABRA"];
    const tamano = 10;
    const [sopa, setSopa] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [encontradas, setEncontradas] = useState(new Set());
    const [posicionesEncontradas, setPosicionesEncontradas] = useState([]);
    const [posicionesPalabras, setPosicionesPalabras] = useState(new Map());

    const generarNuevaSopa = () => {
        const { sopa, posicionesPalabras } = generarSopaDeLetras(tamano, palabras);
        setSopa(sopa);
        setPosicionesPalabras(posicionesPalabras);
        setEncontradas(new Set());
        setSeleccionadas([]);
        setPosicionesEncontradas([]);
    };

    useEffect(() => {
        generarNuevaSopa();
    }, []);

    const manejarClick = (fila, columna) => {
        const indice = seleccionadas.findIndex(s => s.fila === fila && s.columna === columna);
        let nuevaSeleccion = indice !== -1 
            ? seleccionadas.filter((_, i) => i !== indice) 
            : [...seleccionadas, { fila, columna }];
    
        setSeleccionadas(nuevaSeleccion);
    
        if (nuevaSeleccion.length > 1) {
            // Ordenamos por fila y columna para verificar la dirección
            nuevaSeleccion.sort((a, b) => a.fila - b.fila || a.columna - b.columna);
            
            let palabraSeleccionada = nuevaSeleccion.map(({ fila, columna }) => sopa[fila][columna]).join('');
            let palabraInvertida = palabraSeleccionada.split('').reverse().join('');

            if (posicionesPalabras.has(palabraSeleccionada)) {
                setEncontradas(new Set([...encontradas, palabraSeleccionada]));
                setPosicionesEncontradas(prev => [...prev, ...posicionesPalabras.get(palabraSeleccionada)]);
                setSeleccionadas([]);
            } else if (posicionesPalabras.has(palabraInvertida)) {
                setEncontradas(new Set([...encontradas, palabraInvertida]));
                setPosicionesEncontradas(prev => [...prev, ...posicionesPalabras.get(palabraInvertida)]);
                setSeleccionadas([]);
            }
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1>Sopa de Letras</h1>
            <button onClick={generarNuevaSopa} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>Nueva Sopa</button>
            <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                <div>
                    <h3>Palabras a buscar:</h3>
                    <ul>
                        {palabras.map((palabra, index) => (
                            <li key={index} style={{ textDecoration: encontradas.has(palabra) ? "line-through" : "none" }}>
                                {palabra}
                            </li>
                        ))}
                    </ul>
                </div>
                <table style={{ borderCollapse: "collapse" }}>
                    <tbody>
                        {sopa.map((fila, i) => (
                            <tr key={i}>
                                {fila.map((letra, j) => {
                                    const esSeleccionado = seleccionadas.some(s => s.fila === i && s.columna === j);
                                    const esEncontrado = posicionesEncontradas.some(p => p.fila === i && p.columna === j);
                                    return (
                                        <td key={j} onClick={() => manejarClick(i, j)} style={{
                                            border: "1px solid black", padding: "10px", textAlign: "center", fontSize: "20px", width: "30px", height: "30px",
                                            backgroundColor: esEncontrado ? "lightgreen" : esSeleccionado ? "lightblue" : "white",
                                            cursor: "pointer", userSelect: "none"
                                        }}>
                                            {letra}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h3>Palabras encontradas:</h3>
                    <ul>
                        {[...encontradas].map((palabra, index) => (
                            <li key={index}>{palabra}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SopaDeLetras;
