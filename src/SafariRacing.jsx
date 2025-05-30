import { useState, useEffect } from "react";
import swal from "sweetalert2";
import jeepIMG from "../src/resources/jeep.png";
import "../src/css/SafariRacing.css"
import welcomeImg from "../src/resources/safariIcon.png"
import withReactContent from "sweetalert2-react-content";
import { mostrarInsignia } from "./helpers/insigniasHelper";
import BackgroundMusic from "./components/backgroundMusic";
import musicaSafari from "../src/resources/Sounds/Jade Jungle - Paper Mario (N64) Soundtrack - Daintii Music.mp3";

const MySwal = withReactContent(swal);

export default function CarreraDeAutos() {

    const [pos1, setPos1] = useState(0); 
    const [pos2, setPos2] = useState(0); 
    const [winner, setWinner] = useState(null);
    const [turboActive, setTurboActive] = useState(false);
    const [boostActive, setBoostActive] = useState(false);
    const [boost, setBoost] = useState(3);
    const meta = typeof window !== "undefined" ? window.innerWidth * 0.75 : 500;
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [progreso, setProgreso] = useState({ actividadesCompletadas: 0, porcentaje: 0 });
    const [pausado, setPausado] = useState(false);

    const [errores, setErrores] = useState(0);
    const [insigniasOtorgadas, setInsigniasOtorgadas] = useState(false);
    
    const retos = [
        {pregunta: "Completa: 2 + 2 = ?", respuesta: '4'},
        {pregunta: "Palabra clave para crear funciones", respuesta: 'function'},
        {pregunta: "Palabra clave para crear condicionales", respuesta: 'if'},
        {pregunta: "¿Resultado de 5 * 4?", respuesta: '20'},
        {pregunta: "¿Cómo se llama el operador de suma?", respuesta: '+'}, 
        {pregunta: "Palabra clave para crear bucles", respuesta: 'for'},
        {pregunta: "¿Que tipo de dato representa un texto?", respuesta: 'string'},
        {pregunta: "¿Que palabra retorna un valor de una función?", respuesta: 'return'},
        {pregunta: "¿Que significa JS?", respuesta: 'javascript'},
        {pregunta: "Evento que ocurre al hacer clic", respuesta: 'click'}
        
    ];

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
        if (!juegoIniciado || pausado) return;
        const handleKeyDown = (event) => {
            if (winner) return;
            if (event.key.toLowerCase() === "a") {
               lanzarReto();
            }
            if (event.key.toLowerCase() === "s" && boost > 0) { // Tecla "S" para usar boost
                // Activar efecto de boost
                setBoostActive(true);
                setTimeout(() => setBoostActive(false), 500);
                
                setBoost(prev => prev - 1);
                setPos1(prev => Math.min(prev + 50, meta));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [winner, boost, juegoIniciado, pausado]);

    useEffect(() => {
        if ( !juegoIniciado||winner || pausado) return;

        const interval = setInterval(() => {
            setPos2(prev => {
                const avance = Math.random() * 15 + 5; // Movimiento aleatorio entre 5 y 35 px
                if (prev + avance >= meta) {
                    setWinner("Computadora");
                    clearInterval(interval);
                    return meta;
                }
                return prev + avance;
            });
        }, Math.random() * 400 + 400); // La computadora varía su velocidad

        return () => clearInterval(interval);
    }, [juegoIniciado,winner, pausado]);

    async function lanzarReto() {
        setPausado(true); // Pausar el juego
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

        setPausado(false); // Reanudar el juego

        if (respuesta !== undefined) {
            if (respuesta.trim() === retoAleatorio.respuesta) {
                setPos1(prev => {
                    const avance = Math.random() * 60 + 30;
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
    if (!winner || insigniasOtorgadas) return;

    const username = localStorage.getItem("username");
    if (!username) return;

    const clavesRaw = localStorage.getItem("swalsMostrados");
    const claves = clavesRaw ? JSON.parse(clavesRaw) : {};
    const updated = { ...claves, [username]: { ...(claves[username] || {}) } };

    const nuevasInsignias = [];

    const otorgarInsignias = async () => {
        setInsigniasOtorgadas(true); // 🔒 asegurar que solo se ejecute una vez

        // 🦁 Piloto del Safari
        if (!updated[username].pilotoSafari) {
            await mostrarInsignia({
                nombre: "Piloto del Safari",
                descripcion: "Completaste la carrera en Safari Racing",
                fecha: new Date().toLocaleDateString(),
                imagenUrl: "/insignias/Piloto del Safari.png"
            });
            updated[username].pilotoSafari = true;
          
        }

        // 🧠 Sin errores
        if (winner?.startsWith("Jugador") && errores === 0 && !updated[username].sinErrores) {
            await mostrarInsignia({
                nombre: "Sin errores",
                descripcion: "Completaste una actividad sin cometer errores",
                fecha: new Date().toLocaleDateString(),
                imagenUrl: "/insignias/sin errores.png"
            });
            updated[username].sinErrores = true;
            
        }

        localStorage.setItem("swalsMostrados", JSON.stringify(updated));

        // Solo mostrar esta pantalla si no fue redirigido
        mostrarModalFinal();
    };

    otorgarInsignias();
}, [winner]);
 function mostrarModalFinal() {
        MySwal.fire({
            title: `¡${winner} GANA!`,
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
            backdrop: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) reiniciar();
            else window.location.href = "/home";
        });
    }


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
            <BackgroundMusic audioSrc={musicaSafari} />
            <div className="carrera-content">
                <div className="carrera-instrucciones">
                    <h2>Instrucciones</h2>
                    <p>Presiona "A" para lanzar un reto. Si aciertas, avanzas. Si fallas, no avanzas.</p>
                    <p>Presiona "S" para usar el boost. Tienes {boost} restantes.</p>
                </div>
            
                <div className="carrera-pista">
                    <img src={jeepIMG} className={`carrera-auto ${
                        turboActive ? 'turbo-effect': 
                        boostActive ? 'boost-effect' : ''}`} 
                        id="jeep1" 
                        style={{left: pos1}}/>
                </div>

                <div className="carrera-pista">
                    <img src={jeepIMG} className="carrera-auto" id="jeep2" style={{left: pos2}}/>
                </div>
            </div>
        </div>
    );
}
