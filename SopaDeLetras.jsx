import React, { useEffect, useState } from "react";

function generarSopaDeLetras(tamano, palabras) {
    let sopa = new Array(tamano).fill(null).map(() => new Array(tamano).fill(' '));
    let palabrasColocadas = new Set();

    function colocarPalabra(palabra) {
        palabra = palabra.toUpperCase();
        let direcciones = [
            [1, 0], [0, 1], [1, 1], [-1, 1]
        ]; // Horizontal, vertical, diagonal
    
        for (let intento = 0; intento < 100; intento++) {
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
    
                for (let i = 0; i < palabra.length; i++) {
                    let x = fila + i * dx, y = columna + i * dy;
                    if (x >= 0 && x < tamano && y >= 0 && y < tamano) {
                        if (sopa[x][y] !== " " && sopa[x][y] !== palabra[i]) {
                            puedeColocar = false;
                            break;
                        }
                    } else {
                        puedeColocar = false;
                        break;
                    }
                }
    
                if (puedeColocar) {
                    for (let i = 0; i < palabra.length; i++) {
                        let x = fila + i * dx, y = columna + i * dy;
                        sopa[x][y] = palabra[i];
                    }
                    palabrasColocadas.add(palabra);
                    return;
                }
            }
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
    return { sopa, palabrasColocadas };
}

const SopaDeLetras = () => {
    const palabras = ["JAVASCRIPT", "CODIGO", "LETRAS", "JUEGO", "PALABRA"];
    const tamano = 10;
    const [sopa, setSopa] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [encontradas, setEncontradas] = useState(new Set());

    useEffect(() => {
        const { sopa, palabrasColocadas } = generarSopaDeLetras(tamano, palabras);
        setSopa(sopa);
    }, []);

    const manejarClick = (fila, columna) => {
        const indice = seleccionadas.findIndex(s => s.fila === fila && s.columna === columna);
        if (indice !== -1) {
            const nuevaSeleccion = seleccionadas.filter((_, i) => i !== indice);
            setSeleccionadas(nuevaSeleccion);
        } else {
            const nuevaSeleccion = [...seleccionadas, { fila, columna }];
            const palabraSeleccionada = nuevaSeleccion.map(({ fila, columna }) => sopa[fila][columna]).join('');

            if (palabras.includes(palabraSeleccionada)) {
                setEncontradas(new Set([...encontradas, palabraSeleccionada]));
                setSeleccionadas([]);
            } else {
                setSeleccionadas(nuevaSeleccion);
            }
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>Sopa de Letras</h1>
            <table style={{ borderCollapse: "collapse", margin: "auto" }}>
                <tbody>
                    {sopa.map((fila, i) => (
                        <tr key={i}>
                            {fila.map((letra, j) => {
                                const seleccionado = seleccionadas.some(s => s.fila === i && s.columna === j);
                                const encontrado = encontradas.has(letra);
                                return (
                                    <td 
                                        key={j} 
                                        onClick={() => manejarClick(i, j)} 
                                        style={{
                                            border: "1px solid black",
                                            padding: "10px",
                                            textAlign: "center",
                                            fontSize: "20px",
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: encontrado ? "lightgreen" : seleccionado ? "lightblue" : "white",
                                            cursor: "pointer"
                                        }}>
                                        {letra}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Palabras encontradas:</h3>
            <ul>
                {[...encontradas].map((palabra, index) => (
                    <li key={index}>{palabra}</li>
                ))}
            </ul>
        </div>
    );
};

export default SopaDeLetras;
