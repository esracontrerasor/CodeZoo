import "./css/foroDeAyuda.css";
import Navbar from "./components/navbar/Navbar.jsx";
import React, { useState, useEffect } from 'react';
import swal from "sweetalert2";
import axios from "axios";

const Foro = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const Question = async (e) => {
    e.preventDefault();
    if (titulo.trim() === "" || contenido.trim() === "") {
      alert("Por favor llena tanto el título como el contenido de la pregunta.");
      return;
    }
    try {
      const autor = localStorage.getItem("username");
      const fecha = new Date().toISOString();
      const estado = "pendiente";
      const comentarios = [];
  
      await axios.post("http://localhost:3000/api/foro/pregunta", {
        titulo,
        contenido,
        autor,
        fecha,
        estado,
        comentarios
      });
  
      // ✅ Recargar preguntas tras enviar
      const response = await axios.post("http://localhost:3000/api/foro/autor", { autor });
      setPreguntas(response.data);
  
      setMostrarAlerta(true);
      setTitulo("");
      setContenido("");
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "No se pudo hacer la pregunta",
        text: "Ha surgido un error al intentar publicar la pregunta, por favor inténtelo más tarde",
      });
    }
  };
  
  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const autor = localStorage.getItem("username");
        const response = await axios.post("http://localhost:3000/api/foro/autor", { autor });
        setPreguntas(response.data);
      } catch (error) {
        console.error("Error al obtener las preguntas del foro", error);
      }
    };
    cargarPreguntas();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="foro-contenedor">
        <h1 className="titulo-foro" style={{ paddingBottom: "1rem" }}>Foro de Ayuda</h1>
        <div className="formulario-pregunta">
          <label className="titulo-editable"> <b>Titulo de la pregunta</b> </label>
          <input className="input-question" type="text" placeholder="Escribe un titulo para tu duda o problema aquí…" value={titulo} onChange={(e) => setTitulo(e.target.value)} resize="none" />
          <b>Tu pregunta</b>
          <textarea
            placeholder="Describe tu problema o duda aquí…"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}

          />
          <button
            className="boton-publicar"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
            onClick={Question}
          >
            Publicar
          </button>
        </div>

        <div className="preguntas-lista">
          {preguntas
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Orden descendente por fecha
            .slice(0, 8) // Solo las 8 más recientes
            .map((pregunta) => (
              <div key={pregunta._id} className="chat-container">

                <div className="chat-header">
                  <p className="chat-fecha"> {new Date(pregunta.fecha).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short", })}</p>
                </div>

                <div className="chat-content">
                  <h3 className="pregunta-titulo">{pregunta.titulo}</h3>
                  <p className="pregunta-autor"> {pregunta.autor}</p>
                  <p className="pregunta-contenido">{pregunta.contenido}</p>

                  {/*Activar si es necesario*/}
                  {/*<p><em>Estado: {pregunta.estado}</em></p> */}

                  <div className="respuestas">
                    <p className ="respuesta-autor">Ayudante</p>
                    {pregunta.comentarios && pregunta.comentarios.length > 0 ? (
                      <>
                      <div className="respuestas-content">
                      <p className="respuesta-contenido">{pregunta.comentarios[0].contenido}</p>
                        <p className="fecha-respuesta"><em>{new Date(pregunta.comentarios[0].fecha).toLocaleString(
                          "es-MX", {dateStyle: "short", timeStyle: "short",})}</em></p>
                      </div>    
                      </>
                    ) : (
                      <p>Responderemos pronto...</p>
                    )}
                  </div>
                </div>               
              </div>
            ))}
        </div>
        {mostrarAlerta && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <img src="resource/Zebra.png" alt="Zebra" />
              <h2>¡Gracias por enviar tu duda!</h2>
              <p>Un administrador estará revisando tu duda y te responderá lo antes posible</p>
              <button onClick={() => setMostrarAlerta(false)}>ACEPTAR</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foro;
