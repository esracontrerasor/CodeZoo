import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "./components/navbar/Navbar";
import CodeZooCat from "../src/CoodeZooCat";
import StartEffect from "../src/StartEffect";
import "../src/css/Memorama.css";
import cartaDorso from "../src/resources/Mem/Carta.png";
import { mostrarInsignia } from "./helpers/insigniasHelper";
import BackgroundMusic from "./components/backgroundMusic";
import musicaMemorama from "../src/resources/Sounds/Shy Guy's Toy Box - Paper Mario (N64) Soundtrack - Daintii Music.mp3";

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
import welcomeImg from "../src/resources/cocodrilo_img.png";
import endImg from "../src/resources/cocodrilo2_img.png";
import axios from "axios";

const MySwal = withReactContent(swal);

const generarCartas = () => {
    const cartasDuplicadas = [...imagenes, ...imagenes]
        .sort(() => Math.random() - 0.5)
        .map((carta, index) => ({ ...carta, idUnico: index, volteada: false, encontrada: false }));

    return cartasDuplicadas;
};

const Memorama = () => {
    const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
    const [mostrarFin, setMostrarFin] = useState(false);


    const [cartas, setCartas] = useState(generarCartas());
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [bloqueado, setBloqueado] = useState(false);
    const [ganador, setGanador] = useState(false);
    const [mensajeGato, setMensajeGato] = useState("");
    const [gatoVisible, setGatoVisible] = useState(false);
    const [mostrarEstrellas, setMostrarEstrellas] = useState(false);
    const [inicioJuego, setInicioJuego] = useState(null);
    const [insigniasMostradas, setInsigniasMostradas] = useState(false);

    const actualizarProgreso = async() => {
        const idUusuario = localStorage.getItem("id");

        try {
            const respuesta = await axios.get(`https://backend-codezoo.onrender.com/api/usuarios/${idUusuario}`);
            const usuario = await respuesta.data;
            
            //Calcular el progreso
            let progresoActual = usuario.progreso || { actividadesCompletadas: 0, porcentaje: 0 };
            const nuevasActividadesCompletadas = progresoActual.actividadesCompletadas + 1;
            //Ajustar porcentaje para que suba de 10 en 10 por cada actividad
            const nuevoPorcentaje = Math.min(100, nuevasActividadesCompletadas * 10);
           
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
        if (cartas.every(c => c.encontrada)) {
            setGanador(true);
            setMensajeGato("¡Felicidades! Has encontrado todos los pares. 🎉");
            setGatoVisible(true);


            if (!insigniasMostradas) {
                const username = localStorage.getItem("username");
                const clavesRaw = localStorage.getItem("swalsMostrados");
                const claves = clavesRaw ? JSON.parse(clavesRaw) : {};
                const updated = { ...claves, [username]: { ...(claves[username] || {}) } };
                const nuevasInsignias = [];

                const duracion = (Date.now() - inicioJuego) / 1000;

                const mostrarInsignias = [];

                if (!claves?.[username]?.exploradorMemoria) {
                    mostrarInsignias.push(async () => {
                        await mostrarInsignia({
                            nombre: "Explorador de Memoria",
                            descripcion: "Jugaste Memorama por primera vez",
                            fecha: new Date().toLocaleDateString(),
                            imagenUrl: "/insignias/Explorador de memoria.png"
                        });
                        updated[username].exploradorMemoria = true;
                    });
                }

                if (duracion <= 150 && !claves?.[username]?.maestroMemo) {
                    mostrarInsignias.push(async () => {
                        await mostrarInsignia({
                            nombre: "Maestro del Memo",
                            descripcion: "Completaste el memorama en menos de 2:30 minutos",
                            fecha: new Date().toLocaleDateString(),
                            imagenUrl: "/insignias/maestro del memo.png"
                        });
                        updated[username].maestroMemo = true;
                    });
                }

                if (duracion <= 300 && !claves?.[username]?.perseverante) {
                    mostrarInsignias.push(async () => {
                        await mostrarInsignia({
                            nombre: "Perseverante",
                            descripcion: "Completaste el memorama en menos de 5 minutos",
                            fecha: new Date().toLocaleDateString(),
                            imagenUrl: "/insignias/Perseverante.png"
                        });
                        updated[username].perseverante = true;
                    });
                }

                
                const ejecutarSecuencial = async () => {
                    for (let mostrar of mostrarInsignias) {
                        await mostrar(); 
                    }
                    localStorage.setItem("swalsMostrados", JSON.stringify(updated));
                    setInsigniasMostradas(true);
                    setMostrarFin(true);
                };

                ejecutarSecuencial();
            }
            actualizarProgreso();
        }
    }, [cartas]);

    if (mostrarBienvenida) {
        MySwal.fire({
            title: <strong>¡Bienvenido al juego de Memorama!</strong>,
            html: (
                <div>
                    <img src={welcomeImg} alt="" width="150" height="150" />
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>En este juego, debes encontrar pares de cartas que tengan la misma imagen.</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>¿Estas listo para poner tu mente a prueba?</p>
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
            setInicioJuego(Date.now());
        })
    }

    useEffect(() => {
        if (mostrarFin) {
            MySwal.fire({
                title: <strong>¡FELICIDADES, HAS TERMINADO EL JUEGO!</strong>,
                html: (
                    <div>
                        <img src={endImg} alt="" width="150" height="150" />
                        <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px", marginTop: "10px" }}>¡Has encontrado todos los pares de cartas correctamente!</p>
                        <p style={{ fontSize: "16px", fontWeight: "500" }}>¿Quieres volver a intentarlo?</p>
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

                if (result.isConfirmed) {
                    setCartas(generarCartas());
                    setSeleccionadas([]);
                    setGanador(false);
                } else if (result.isDismissed) {
                    window.location.href = "/home";
                }
            });
        }
    }, [mostrarFin]);

    return (
        <div>
            <Navbar />
            <div className="memorama-body" style={{ textAlign: "center" }}>
                <BackgroundMusic audioSrc={musicaMemorama} />
                <h1 className="memorama-header">MEMORAMA</h1>
                <CodeZooCat contexto="memorama" customMessage={mensajeGato} isOpen={gatoVisible} />
                <div className="memorama-grid">
                    {cartas.map(carta => (
                        <div
                            key={carta.idUnico}
                            onClick={() => !carta.volteada && manejarClick(carta.idUnico)}
                            className={`memorama-card ${carta.volteada || carta.encontrada ? 'flipped' : ''}`}
                        >
                            <div className="card-inner">
                                <div className="card-front">

                                </div>
                                <div className="card-back">
                                    <img src={carta.src} alt="Carta" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <StartEffect trigger={mostrarEstrellas} />
            </div>
        </div>
    );
};

export default Memorama;
