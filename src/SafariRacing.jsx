import { useState, useEffect } from "react";
import swal from "sweetalert2";
import jeepIMG from "../src/resources/jeep.png";
import "../src/css/SafariRacing.css"
import welcomeImg from "../src/resources/safariIcon.png"
import withReactContent from "sweetalert2-react-content";



const MySwal = withReactContent(swal);

export default function CarreraDeAutos() {

    const [pos1, setPos1] = useState(0); 
    const [pos2, setPos2] = useState(0); 
    const [winner, setWinner] = useState(null);
    const [boost, setBoost] = useState(3);
    const meta = typeof window !== "undefined" ? window.innerWidth * 0.75 : 500;
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [progreso, setProgreso] = useState({ actividadesCompletadas: 0, porcentaje: 0 });


    const retos = [
        {pregunta: "Completa: 2 + 2 = ?", respuesta: '4'},
        {pregunta: "¿Palabra clave para crear funciones en JS?", respuesta: 'function'},
        {pregunta: "¿Palabra clave para crear condicionales en JS?", respuesta: 'if'},
        {pregunta: "¿Resultado de 5 * 4?", respuesta: '20'},
        {pregunta: "¿Cómo se llama el operador de suma?", respuesta: '+'},   
    ];

    const actualizarProgreso = async() => {
        const idUusuario = localStorage.getItem("id");

        try {
            const respuesta = await axios.get(`http://localhost:3000/api/usuarios/${idUusuario}`);
            const usuario = await respuesta.data;

            let progresoActual = usuario.progreso || { actividadesCompletadas: 0, porcentaje: 0 };
            let completadas = progresoActual.actividadesCompletadas;
         
            const nuevasActividades = progresoActual.actividadesCompletadas + 1;
            const nuevoPorcentaje = Math.min(100, Math.round((nuevasActividades / completadas) * 100));
           
            const response = await axios.post(`http://localhost:3000/api/usuarios/${idUusuario}/progreso`, { 
                actividadesCompletadas: nuevasActividades,
                 porcentaje: nuevoPorcentaje }
            );
            
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
        MySwal.fire({
            title: '¡Bienvenido a Safari Racing!',
            html: (
                <div>
                    <img src={welcomeImg} alt="" width="150" height="150"/>
                    <p style={{fontSize: "16px", fontWeight: "500"}}>¡Prepárate para una emocionante y desafiante carrera!</p>
                    <p style={{fontSize: "16px", fontWeight: "500"}}>¿Estas listo?</p>
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
            if(result.isConfirmed){
                setJuegoIniciado(true);
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
        if ( !juegoIniciado||winner) return;

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
    }, [juegoIniciado,winner]);

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
                MySwal.fire(
                    '¡Incorrecto! 🛑', 'No avanzaste, intenta presionando A', 'error'
                )
            
        }
        }
    }

    useEffect(() => {
        if (winner) {
            MySwal.fire({
                title:<strong>¡{winner} GANA!</strong> ,
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
                } else if(result.isDismissed)  {
                    window.location.href = "/home";
                }
            });
            
        }
    }, [winner]);

    useEffect(() => {
        if (winner === "Jugador") {
            actualizarProgreso();
        }
    }, [winner]);

    function reiniciar() {
        setPos1(0);
        setPos2(0);
        setWinner(null);
        setBoost(3);
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
                    <img src={jeepIMG} className="carrera-auto" id="jeep1" style={{left: pos1}}/>
                </div>

                <div className="carrera-pista">
                    <img src={jeepIMG} className="carrera-auto" id="jeep2" style={{left: pos2}}/>
                </div>
            </div>
        </div>
    );
}
