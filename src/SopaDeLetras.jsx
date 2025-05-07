import React, { useEffect, useState } from "react";
import CodeZooCat from "../src/CoodeZooCat";
import "../src/css/SopaDeLetras.css";
import withReactContent from "sweetalert2-react-content";
import swal from "sweetalert2";
import welcomeImg from "../src/resources/leon_searching.png";
import endImg from "../src/resources/leon_like.png";

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

const SopaDeLetras = () => {
    const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
    const [mostrarFin, setMostrarFin] = useState(false);

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

    if(mostrarBienvenida) {
            MySwal.fire ({
                title: <strong>¡Bienvenido a la Sopa de Letras!</strong>,
                html: (
                    <div>
                        <img src={welcomeImg} alt="" width="150" height="150"/>
                        <p style={{fontSize: "16px", fontWeight: "500"}}>Encuentra las palabras ocultas en la sopa de letras.</p>
                    </div>
                ),
                showConfirmButton: true,
                confirmButtonText: "JUGAR AHORA",
                customClass: {
                    confirmButton: "play-button",
                },
                backdrop: true,
                allowOutsideClick: false,
            }).then(() => {
                setMostrarBienvenida(false);
            })
        }
    
        useEffect(() => {
            if(mostrarFin) {
                MySwal.fire ({
                    title: <strong>¡SOPA DE LETRAS COMPLETADA!</strong>,
                    html: (
                        <div>
                            <img src={endImg} alt="" width="150" height="150"/>
                            <p style={{fontSize: "16px", fontWeight: "500", marginBottom: "10px", marginTop: "10px"}}>¡Excelente trabajo! Has encontrado todas las palabras escondidas en la sopa</p>
                            <p style={{fontSize: "16px", fontWeight: "500"}}>¿Quieres volver a intentarlo?</p>
                        </div>
                    ),
                    showConfirmButton: true,
                    confirmButtonText: "JUGAR DE NUEVO",
                    showCancelButton: true,
                    cancelButtonText: "SALIR",
                    customClass: {
                        confirmButton: "play-button",
                        cancelButton: "cancel-button",
                    },
                    backdrop: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    setMostrarFin(false);
        
                    if(result.isConfirmed) {
                        generarNuevaSopa();
                    } else if(result.isDismissed) {
                        window.location.href = "/home";
                    }
                });
            }
        }, [mostrarFin]);

        const actualizarProgreso = async() => {
            const idUusuario = localStorage.getItem("id");
    
            try {
                const respuesta = await axios.get(`http://localhost:3000/api/usuarios/${idUusuario}`);
                const usuario = await respuesta.data;
    
                let progresoActual = usuario.progreso || { actividadesCompletadas: 0, porcentaje: 0 };
                let completadas = progresoActual.actividadesCompletadas;
             
                const nuevasActividades = progresoActual.actividadesCompletadas + 1;
                const nuevoPorcentaje = Math.min(100, Math.round((nuevasActividades / completadas) * 100));
               
                const response = await axios.post(`http://localhost:3000/api/usuarios/${idUusuario}/progreso`, { actividadesCompletadas: nuevasActividades, porcentaje: nuevoPorcentaje });
                
                if (response.status === 200) {
                    console.log("Progreso actualizado con éxito");
                } else {
                    console.error("Error al actualizar el progreso");
                }
            
            }catch (error) {
                console.error('Error al actualizar el progreso:', error);
            } 
    
    };

    useEffect(() => {
        if (encontradas.size === listaPalabras.length) {
            actualizarProgreso();
            setMostrarFin(true);
        }
    }, [encontradas, listaPalabras]);

    return (
        <div className="sopa-container">
            <h1 className="sopa-header">SOPA DE LETRAS</h1>
            <CodeZooCat contexto="sopa-de-letras" customMessage={mensajeGato} isOpen={gatoVisible} />

            {encontradas.size ===palabras1.length && (
                <h2 style={{ color: "white" }} className="mensaje-exito">¡Felicidades! Has encontrado todas las palabras.</h2>
            )}
    
            <div className="sopa-layout">
                {/* 📌 Palabras a buscar (izquierda) */}
                <div className="sopa-column">
                    <h3>Palabras a buscar:</h3>
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
    
                {/* 📌 Palabras encontradas (derecha) */}
                <div className="sopa-column">
                    <h3>Palabras encontradas:</h3>
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
