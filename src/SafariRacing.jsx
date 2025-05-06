import { useState, useEffect } from "react";
import swal from "sweetalert2";
import jeepIMG from "../src/resources/jeep.png";
import "../src/css/SafariRacing.css"
import welcomeImg from "../src/resources/safariIcon.png"
import withReactContent from "sweetalert2-react-content";
import { mostrarInsignia } from "./helpers/insigniasHelper";

const MySwal = withReactContent(swal);

export default function CarreraDeAutos() {


    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [winner, setWinner] = useState(null);
    const [boost, setBoost] = useState(3);
    const meta = typeof window !== "undefined" ? window.innerWidth * 0.75 : 500;
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [errores, setErrores] = useState(0);

    const retos = [
        { pregunta: "Completa: 2 + 2 = ?", respuesta: '4' },
        { pregunta: "¿Palabra clave para crear funciones en JS?", respuesta: 'function' },
        { pregunta: "¿Palabra clave para crear condicionales en JS?", respuesta: 'if' },
        { pregunta: "¿Resultado de 5 * 4?", respuesta: '20' },
        { pregunta: "¿Cómo se llama el operador de suma?", respuesta: '+' },
    ];

    useEffect(() => {
        MySwal.fire({
            title: '¡Bienvenido a Safari Racing!',
            html: (
                <div>
                    <img src={welcomeImg} alt="" width="150" height="150" />
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>¡Prepárate para una emocionante y desafiante carrera!</p>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>¿Estás listo?</p>
                </div>
            ),
            showConfirmButton: true,
            confirmButtonText: "JUGAR AHORA",
            customClass: {
                confirmButton: "play-button",
            },
            backdrop: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                setJuegoIniciado(true);

                // 🔒 Solo dar la insignia si aún no la tiene
                const username = localStorage.getItem("username");
                if (!username) return;

                const clavesMostradasRaw = localStorage.getItem("swalsMostrados");
                const clavesMostradas = clavesMostradasRaw ? JSON.parse(clavesMostradasRaw) : {};
                const yaMostrada = clavesMostradas?.[username]?.primerosPasos;

                if (!yaMostrada) {
                    mostrarInsignia({
                        nombre: "Primeros pasos",
                        descripcion: "Jugaste y completaste tu primer juego en CodeZoo",
                        fecha: new Date().toLocaleDateString(),
                        imagenUrl: "/insignias/primeros pasos.png"
                    });

                    // Guardar que ya se mostró
                    const updated = {
                        ...clavesMostradas,
                        [username]: {
                            ...(clavesMostradas[username] || {}),
                            primerosPasos: true
                        }
                    };
                    localStorage.setItem("swalsMostrados", JSON.stringify(updated));
                }
            }
        });
    }, []);


    useEffect(() => {
        if (!juegoIniciado) return;
        const handleKeyDown = (event) => {
            if (winner) return;
            if (event.key.toLowerCase() === "a") {
                lanzarReto();
            }
            if (event.key.toLowerCase() === "s" && boost > 0) { // Tecla "S" para usar boost
                setBoost(prev => prev - 1);
                setPos1(prev => Math.min(prev + 50, meta));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [winner, boost, juegoIniciado]);

    useEffect(() => {
        if (!juegoIniciado || winner) return;

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
    }, [juegoIniciado, winner]);

    async function lanzarReto() {
        const retoAleatorio = retos[Math.floor(Math.random() * retos.length)];

        const { value: respuesta } = await MySwal.fire({
            title: 'Resuelve la siguiente pregunta',
            text: retoAleatorio.pregunta,
            input: 'text',
            inputPlaceholder: 'Escribe tu respuesta aqui',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,

        });

        if (respuesta !== undefined) {
            if (respuesta.trim() === retoAleatorio.respuesta) {
                setPos1(prev => {
                    const avance = Math.random() * 45 + 15;
                    const nuevoPos = prev + avance;
                    if (nuevoPos >= meta) {
                        setWinner("Jugador 1");
                        return meta;
                    }
                    return nuevoPos;
                });
                MySwal.fire(
                    '¡Correcto! 🚗💨', 'Avanzaste ', 'success'
                )
            } else {
                setErrores(prev => prev + 1);
                MySwal.fire(
                    '¡Incorrecto! 🛑', 'No avanzaste, intenta presionando A', 'error'
                )

            }
        }
    }

    useEffect(() => {
        if (!winner) return;

        const username = localStorage.getItem("username");
        if (!username) return;

        const clavesMostradasRaw = localStorage.getItem("swalsMostrados");
        const clavesMostradas = clavesMostradasRaw ? JSON.parse(clavesMostradasRaw) : {};
        const updated = {
            ...clavesMostradas,
            [username]: {
                ...(clavesMostradas[username] || {})
            }
        };

        // Esperar que termine animación
        setTimeout(async () => {
            // 🥇 PRIMEROS PASOS
            if (!clavesMostradas?.[username]?.primerosPasos) {
                mostrarInsignia({
                    nombre: "Primeros pasos",
                    descripcion: "Jugaste y completaste tu primer juego en CodeZoo",
                    fecha: new Date().toLocaleDateString(),
                    imagenUrl: "/insignias/primeros pasos.png"
                });

                updated[username].primerosPasos = true;

                await swal.fire({
                    title: "¡Ganaste tu primera insignia! 🎉",
                    text: "Ve a tu perfil para verla y seguir coleccionando más.",
                    icon: "success",
                    confirmButtonText: "Ir al perfil",
                    showCancelButton: true,
                    cancelButtonText: "Cerrar"
                }).then((res) => {
                    if (res.isConfirmed) {
                        localStorage.setItem("swalsMostrados", JSON.stringify(updated));
                        window.location.href = "/perfil";
                    }
                });
            }

            // 🧠 SIN ERRORES
            if (errores === 0 && !clavesMostradas?.[username]?.sinErrores) {
                mostrarInsignia({
                    nombre: "Sin errores",
                    descripcion: "Completaste una actividad sin cometer errores",
                    fecha: new Date().toLocaleDateString(),
                    imagenUrl: "/insignias/sin errores.png"
                });

                updated[username].sinErrores = true;

                await swal.fire({
                    title: "¡Impresionante! 🧠",
                    text: "Completaste el juego sin errores. Ve a tu perfil para ver tu insignia.",
                    icon: "success",
                    confirmButtonText: "Ir al perfil",
                    showCancelButton: true,
                    cancelButtonText: "Cerrar"
                }).then((res) => {
                    if (res.isConfirmed) {
                        localStorage.setItem("swalsMostrados", JSON.stringify(updated));
                        window.location.href = "/perfil";
                    }
                });
            }
            // 🦁 PILOTO DEL SAFARI
            if (!clavesMostradas?.[username]?.pilotoSafari) {
                mostrarInsignia({
                    nombre: "Piloto del Safari",
                    descripcion: "Completaste la carrera en Safari Racing",
                    fecha: new Date().toLocaleDateString(),
                    imagenUrl: "/insignias/Piloto del Safari.png"
                });

                updated[username].pilotoSafari = true;

                await swal.fire({
                    title: "¡Nuevo logro desbloqueado! 🦁",
                    text: "Has recibido la insignia 'Piloto del Safari'. Ve a tu perfil para verla.",
                    icon: "success",
                    confirmButtonText: "Ir al perfil",
                    showCancelButton: true,
                    cancelButtonText: "Cerrar"
                }).then((res) => {
                    if (res.isConfirmed) {
                        localStorage.setItem("swalsMostrados", JSON.stringify(updated));
                        window.location.href = "/perfil";
                    }
                });
            }

            localStorage.setItem("swalsMostrados", JSON.stringify(updated));
            mostrarModalFinal();
        }, 1000);
    }, [winner]);



    function reiniciar() {
        setPos1(0);
        setPos2(0);
        setWinner(null);
        setBoost(3);
    }


    useEffect(() => {
        if (!juegoIniciado) return;

        const interval = setInterval(() => {
            setPos2(prev => Math.min(prev + Math.random() * 7 + 3, meta)); // Movimiento aleatorio
        }, 500 + Math.random() * 200); // Cada 200-400ms

        return () => clearInterval(interval); // Limpiar intervalo
    }, [juegoIniciado]);

    function mostrarModalFinal() {
        MySwal.fire({
            title: <strong>¡{winner} GANA!</strong>,
            html: (
                <div>
                    <img src={welcomeImg} alt="" width="150" height="150" />
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
            if (result.isConfirmed) {
                reiniciar();
            } else if (result.isDismissed) {
                window.location.href = "/home";
            }
        });
    }


    return (
        <div className="carrera-container">
            <div className="carrera-content">
                <div className="carrera-instrucciones">
                    <h2>Instrucciones</h2>
                    <p>Presiona "A" para lanzar un reto. Si aciertas, avanzas. Si fallas, no avanzas.</p>
                    <p>Presiona "S" para usar el boost. Tienes 3 usos.</p>
                </div>

                <div className="carrera-pista">
                    <img src={jeepIMG} className="carrera-auto" id="jeep1" style={{ left: pos1 }} />
                </div>

                <div className="carrera-pista">
                    <img src={jeepIMG} className="carrera-auto" id="jeep2" style={{ left: pos2 }} />
                </div>
            </div>
        </div>
    );

}
