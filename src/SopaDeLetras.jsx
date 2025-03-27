import React, { useEffect, useState } from "react";
import CodeZooCat from "../src/CoodeZooCat";
import "../src/css/SopaDeLetras.css";

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
    const palabras1 = ["JAVA", "CODIGO", "BLOQUE", "SENTENCIA", "CONDICION", "VARIABLE"];
    const palabras2=["INT","FLOAT","DOUBLE","BOOLEAN","CHAR","STRING"]
    const info = {
        "JAVA": "Java es un lenguaje de programación multiplataforma y una plataforma de software.",
        "CODIGO": "Código es un conjunto de instrucciones escritas en un lenguaje de programación.",
        "BLOQUE": "Un bloque es una agrupación de declaraciones e instrucciones en programación.",
        "SENTENCIA": "Una sentencia es una línea de código que ordena una tarea.",
        "CONDICION": "Una condición es una instrucción que se evalúa como verdadera o falsa.",
        "VARIABLE": "Una variable es un espacio en la memoria para almacenar datos. A cada variable se le asigna un nombre único para identificarla.",
        "INT": "INT es un tipo de dato para números enteros. Es uno de los tipos de datos más utilizados para valores numéricos.",
        "FLOAT": "Float es un tipo de dato primitivo que representa un número en coma flotante de 32 bits.",
        "DOUBLE": "Double es un tipo primitivo que permite almacenar números decimales con mayor precisión que el tipo float.",
        "BOOLEAN": "Boolean es un tipo de dato primitivo que solo puede tener dos valores: true o false, útil para flujos de control.",
        "CHAR": "Char es un tipo de dato primitivo que se utiliza para almacenar caracteres individuales, como letras o símbolos.",
        "STRING": "String es un tipo de dato que permite almacenar palabras, frases o nombres."
    };
    const tamano = 10;
    const [sopa, setSopa] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [encontradas, setEncontradas] = useState(new Set());
    const [posicionesEncontradas, setPosicionesEncontradas] = useState([]);
    const [posicionesPalabras, setPosicionesPalabras] = useState(new Map());
    const [mensajeGato, setMensajeGato] = useState("");
    const [gatoVisible, setGatoVisible] = useState(false);
    const [alternarLista, setAlternarLista] = useState(true);
    const [listaPalabras, setListaPalabras] = useState(palabras1);
    const generarNuevaSopa = () => {
        const nuevaLista = listaPalabras === palabras1 ? palabras2 : palabras1;
        setListaPalabras(nuevaLista);
        const { sopa, posicionesPalabras } = generarSopaDeLetras(tamano, nuevaLista);
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
            nuevaSeleccion.sort((a, b) => a.fila - b.fila || a.columna - b.columna);
            
            let palabraSeleccionada = nuevaSeleccion.map(({ fila, columna }) => sopa[fila][columna]).join('');
            let palabraInvertida = palabraSeleccionada.split('').reverse().join('');

            if (posicionesPalabras.has(palabraSeleccionada)) {
                setEncontradas(new Set([...encontradas, palabraSeleccionada]));
                setPosicionesEncontradas(prev => [...prev, ...posicionesPalabras.get(palabraSeleccionada)]);
                setSeleccionadas([]);
                setMensajeGato(`¡Buen trabajo! Has encontrado la palabra ${palabraSeleccionada}. ${info[palabraSeleccionada]}`);
                setGatoVisible(true)
            } else if (posicionesPalabras.has(palabraInvertida)) {
                setEncontradas(new Set([...encontradas, palabraInvertida]));
                setPosicionesEncontradas(prev => [...prev, ...posicionesPalabras.get(palabraInvertida)]);
                setSeleccionadas([]);
                setMensajeGato(`¡Buen trabajo! Has encontrado la palabra ${palabraInvertida}. ${info[palabraInvertida]}`);
                setGatoVisible(true)
            }
            if(gatoVisible){
                setTimeout(()=>{
                    setGatoVisible(false);
                },10000)
            }
        }
    };

    return (
        <div className="sopa-container">
            <h1 className="sopa-header">Sopa de Letras</h1>
            <CodeZooCat contexto="sopa-de-letras" customMessage={mensajeGato} isOpen={gatoVisible} />
            <button onClick={generarNuevaSopa} className="sopa-button">Nueva Sopa</button>
    
            {encontradas.size ===palabras1.length && (
                <h2 style={{ color: "white" }} className="mensaje-exito">¡Felicidades! Has encontrado todas las palabras.</h2>
            )}
    
            <div className="sopa-layout">
                {/* 📌 Palabras a buscar (izquierda) */}
                <div className="sopa-column">
                    <h5>Palabras a buscar:</h5>
                    <ul className="palabras-list">
                        {listaPalabras.map((palabra, index) => (
                            <li key={index} className={encontradas.has(palabra) ? "encontrada" : ""}>
                                {palabra}
                            </li>
                        ))}
                    </ul>
                </div>
    
                {/* 📌 Sopa de letras (centro) */}
                <div className="sopa-grid">
                    <table className="sopa-table">
                        <tbody>
                            {sopa.map((fila, i) => (
                                <tr key={i}>
                                    {fila.map((letra, j) => {
                                        const esSeleccionado = seleccionadas.some(s => s.fila === i && s.columna === j);
                                        const esEncontrado = posicionesEncontradas.some(p => p.fila === i && p.columna === j);
    
                                        return (
                                            <td 
                                                key={j} 
                                                onClick={() => manejarClick(i, j)}
                                                className={esEncontrado ? "encontrado" : esSeleccionado ? "seleccionado" : ""}
                                            >
                                                {letra}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
                {/* 📌 Palabras encontradas (derecha) */}
                <div className="sopa-column">
                    <h5>Palabras encontradas:</h5>
                    <ul  className="palabras-list li">
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
