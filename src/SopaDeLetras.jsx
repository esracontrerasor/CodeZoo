// Agregado: Selección de dificultad y lógica asociada
import Navbar from "./components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import CodeZooCat from "../src/CoodeZooCat";
import "../src/css/SopaDeLetras.css";
import withReactContent from "sweetalert2-react-content";
import swal from "sweetalert2";
import welcomeImg from "../src/resources/leon_searching.png";
import endImg from "../src/resources/leon_like.png";
import { mostrarInsignia } from "./helpers/insigniasHelper";
import axios from "axios";

const MySwal = withReactContent(swal);

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

const niveles = {
    facil: {
        palabras: ["JAVA", "CODIGO", "BLOQUE", "INT", "CHAR"],
        tamano: 8
    },
    medio: {
        palabras: ["JAVA", "CODIGO", "BLOQUE", "SENTENCIA", "CONDICION", "VARIABLE"],
        tamano: 10
    },
    dificil: {
        palabras: ["INT", "FLOAT", "DOUBLE", "BOOLEAN", "CHAR", "STRING", "SENTENCIA", "CONDICION"],
        tamano: 12
    }
};

const SopaDeLetras = () => {
    const [dificultad, setDificultad] = useState("medio");
    const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
    const [mostrarFin, setMostrarFin] = useState(false);
    const [insigniasOtorgadas, setInsigniasOtorgadas] = useState(false);
    const [sopa, setSopa] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [encontradas, setEncontradas] = useState(new Set());
    const [posicionesEncontradas, setPosicionesEncontradas] = useState([]);
    const [posicionesPalabras, setPosicionesPalabras] = useState(new Map());
    const [mensajeGato, setMensajeGato] = useState("");
    const [gatoVisible, setGatoVisible] = useState(false);

    const info = {
        JAVA: "Java es un lenguaje de programación multiplataforma y una plataforma de software.",
        CODIGO: "Código es un conjunto de instrucciones escritas en un lenguaje de programación.",
        BLOQUE: "Un bloque es una agrupación de declaraciones e instrucciones en programación.",
        SENTENCIA: "Una sentencia es una línea de código que ordena una tarea.",
        CONDICION: "Una condición es una instrucción que se evalúa como verdadera o falsa.",
        VARIABLE: "Una variable es un espacio en la memoria para almacenar datos.",
        INT: "INT es un tipo de dato para números enteros.",
        FLOAT: "Float representa un número en coma flotante de 32 bits.",
        DOUBLE: "Double permite almacenar números decimales con mayor precisión.",
        BOOLEAN: "Boolean solo puede tener dos valores: true o false.",
        CHAR: "Char se usa para almacenar caracteres individuales.",
        STRING: "String permite almacenar palabras, frases o nombres."
    };

   const actualizarProgreso = async() => {
        const idUusuario = localStorage.getItem("id");

        try {
            const respuesta = await axios.get(`https://backend-codezoo.onrender.com/api/usuarios/${idUusuario}`);
            const usuario = await respuesta.data;
            
            //Calcular el progreso
            let progresoActual = usuario.progreso || { actividadesCompletadas: 0, porcentaje: 0 };
            const nuevasActividadesCompletadas = progresoActual.actividadesCompletadas + 1;

            // Calcular incremento del porcentaje segun la dificultad
            let incrementoPorcentaje = 0;
            if (dificultad === "facil") {
                incrementoPorcentaje = 5;
            } else if (dificultad === "medio") {
                incrementoPorcentaje = 10;
            } else if (dificultad === "dificil") {
                incrementoPorcentaje = 15;
            }

            const nuevoPorcentaje = Math.min(100, progresoActual.porcentaje + incrementoPorcentaje);
           
            const response = await axios.post(`https://backend-codezoo.onrender.com/api/usuarios/${idUusuario}/progreso`, { actividadesCompletadas: nuevasActividadesCompletadas, porcentaje: nuevoPorcentaje });
            
            if (response.status === 200) {
                console.log("Progreso actualizado con éxito");
            } else {
                console.error("Error al actualizar el progreso");
            }
        
        }catch (error) {
            console.error('Error al actualizar el progreso:', error);
        } 
  };

    const generarNuevaSopa = () => {
        const config = niveles[dificultad];
        const { sopa, posicionesPalabras } = generarSopaDeLetras(config.tamano, config.palabras);
        setSopa(sopa);
        setPosicionesPalabras(posicionesPalabras);
        setEncontradas(new Set());
        setSeleccionadas([]);
        setPosicionesEncontradas([]);
    };

    useEffect(() => {
        generarNuevaSopa();
    }, [dificultad]);

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
                setMensajeGato(`¡Buen trabajo! Has encontrado ${palabraSeleccionada}. ${info[palabraSeleccionada]}`);
                setGatoVisible(true);
            } else if (posicionesPalabras.has(palabraInvertida)) {
                setEncontradas(new Set([...encontradas, palabraInvertida]));
                setPosicionesEncontradas(prev => [...prev, ...posicionesPalabras.get(palabraInvertida)]);
                setSeleccionadas([]);
                setMensajeGato(`¡Buen trabajo! Has encontrado ${palabraInvertida}. ${info[palabraInvertida]}`);
                setGatoVisible(true);
            }

            if (gatoVisible) {
                setTimeout(() => setGatoVisible(false), 10000);
            }
        }
    };

    useEffect(() => {
        if (mostrarBienvenida) {
            MySwal.fire({
                title: <strong>¡Bienvenido a la Sopa de Letras!</strong>,
                html: (
                    <div>
                        <img src={welcomeImg} alt="" width="150" height="150" />
                        <p style={{ fontSize: "16px" }}>Selecciona el nivel de dificultad para comenzar.</p>
                        <select onChange={e => setDificultad(e.target.value)} defaultValue={dificultad}>
                            <option value="facil">Fácil</option>
                            <option value="medio">Medio</option>
                            <option value="dificil">Difícil</option>
                        </select>
                    </div>
                ),
                confirmButtonText: "¡Comenzar!",
                backdrop: true,
                allowOutsideClick: false
            }).then(() => setMostrarBienvenida(false));
        }
    }, [mostrarBienvenida]);

   useEffect(() => {
    const verificarYMostrarInsignia = async () => {
        if (encontradas.size === niveles[dificultad].palabras.length && !insigniasOtorgadas) {
            const username = localStorage.getItem("username");
            const clavesRaw = localStorage.getItem("swalsMostrados");
            const claves = clavesRaw ? JSON.parse(clavesRaw) : {};
            const updated = { ...claves, [username]: { ...(claves[username] || {}) } };

            const otorgar = async (clave, nombre, descripcion, imagenUrl) => {
                if (!claves?.[username]?.[clave]) {
                    await mostrarInsignia({
                        nombre,
                        descripcion,
                        fecha: new Date().toLocaleDateString(),
                        imagenUrl
                    });
                    updated[username][clave] = true;
                }
            };

            if (dificultad === "facil") {
                await otorgar("primerosPasos", "Primeros pasos", "Completaste la sopa de letras en nivel fácil", "/insignias/primeros pasos.png");
            } else if (dificultad === "medio") {
                await otorgar("cazadorLetras", "Cazador de letras", "Completaste la sopa de letras en nivel medio", "/insignias/cazador de letras.png");
            } else if (dificultad === "dificil") {
                await otorgar("maestroSopa", "Maestro de la Sopa de Letras", "Completaste la sopa de letras en nivel difícil", "/insignias/maestro de la sopa de letras.png");
            }

            localStorage.setItem("swalsMostrados", JSON.stringify(updated));
            setInsigniasOtorgadas(true);
            setMostrarFin(true); // <- Solo se muestra al terminar la insignia
            actualizarProgreso();
        }
    };

    verificarYMostrarInsignia();
}, [encontradas, dificultad, insigniasOtorgadas]);


    useEffect(() => {
        if (mostrarFin) {
            MySwal.fire({
                title: <strong>¡SOPA COMPLETADA!</strong>,
                html: (
                    <div>
                        <img src={endImg} alt="" width="150" height="150" />
                        <p>¿Quieres jugar otra vez?</p>
                    </div>
                ),
                confirmButtonText: "Reiniciar",
                showCancelButton: true,
                cancelButtonText: "Salir",
            }).then((result) => {
                setMostrarFin(false);
                if (result.isConfirmed) generarNuevaSopa();
                else window.location.href = "/home";
            });
        }
    }, [mostrarFin]);

    return (
        <div>
        <Navbar />
        <div className="sopa-container">
            <h1 className="sopa-header">SOPA DE LETRAS</h1>
            <CodeZooCat contexto="sopa-de-letras" customMessage={mensajeGato} isOpen={gatoVisible} />

            <div className="sopa-layout">
                <div className="sopa-column">
                    <h3>Palabras a buscar:</h3>
                    <ul className="palabras-list">
                        {niveles[dificultad].palabras.map((palabra, index) => (
                            <li key={index} className={encontradas.has(palabra) ? "encontrada" : ""}>{palabra}</li>
                        ))}
                    </ul>
                </div>

                <div className="sopa-grid">
                    <div className="sopa-table">
                        {sopa.map((fila, i) => (
                            <div key={i} className="sopa-row">
                                {fila.map((letra, j) => {
                                    const esSeleccionado = seleccionadas.some(s => s.fila === i && s.columna === j);
                                    const esEncontrado = posicionesEncontradas.some(p => p.fila === i && p.columna === j);

                                    return (
                                        <div
                                            key={`${i}-${j}`}
                                            onClick={() => manejarClick(i, j)}
                                            className={`sopa-cell ${esEncontrado ? "encontrado" : esSeleccionado ? "seleccionado" : ""}`}
                                        >
                                            {letra}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sopa-column">
                    <h3>Palabras encontradas:</h3>
                    <ul className="palabras-list li">
                        {[...encontradas].map((palabra, index) => (
                            <li key={index}>{palabra}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SopaDeLetras;
