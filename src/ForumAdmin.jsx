import React, { useState, useEffect } from "react";
import {
  obtenerForo,
  eliminarForo,
  actualizarForo,
  eliminarComentario,
} from "../../Backend_Codezoo/api/foro";
import "./css/ForumAdmin.css";
import SidebarMenu from "./components/SidebarMenu";
import Spinner from "./components/spinner"; // Asegúrate de tener el Spinner importado
import avatar from "./resources/user_2.png";

const ForumAdmin = () => {
  const [receivedQuestions, setReceivedQuestions] = useState([]);
  const [acceptedQuestions, setAcceptedQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [responseText, setResponseText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [loading, setLoading] = useState(false); // Estado para controlar el Spinner

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedQuestion &&
        !event.target.closest(".response-box") &&
        !event.target.closest(".reply-btn")
      ) {
        setSelectedQuestion(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedQuestion]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Activar el spinner
      try {
        const foroData = await obtenerForo();
        setReceivedQuestions(foroData.filter((q) => q.estado === "pendiente"));
        setAcceptedQuestions(foroData.filter((q) => q.estado === "aprobada"));

        const commentsData = {};
        foroData.forEach((question) => {
          commentsData[question._id] = question.comentarios || [];
        });
        setComments(commentsData);
      } catch (error) {
        console.error("Error al obtener las dudas:", error);
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    };

    fetchQuestions();
  }, []);

  const toggleComments = (questionId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleAcceptQuestion = async (question) => {
    setLoading(true); // Activar el spinner
    try {
      const response = await actualizarForo(question._id, {
        estado: "aprobada",
      });

      if (response.error) {
        console.error("Error en la actualización:", response.error);
        return;
      }

      const foroData = await obtenerForo();
      setReceivedQuestions(foroData.filter((q) => q.estado === "pendiente"));
      setAcceptedQuestions(foroData.filter((q) => q.estado === "aprobada"));
    } catch (error) {
      console.error("Error al actualizar la duda:", error);
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  const handleDeleteQuestion = async (question) => {
    setLoading(true); // Activar el spinner
    try {
      const response = await eliminarForo(question._id);
      if (response.error) {
        console.error("Error al eliminar la duda:", response.error);
        return;
      }

      const foroData = await obtenerForo();
      setReceivedQuestions(foroData.filter((q) => q.estado === "pendiente"));
      setAcceptedQuestions(foroData.filter((q) => q.estado === "aprobada"));
    } catch (error) {
      console.error("Error al eliminar la duda:", error);
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  const handleSendResponse = async () => {
    if (!selectedQuestion || !responseText.trim()) return;
    setLoading(true); // Activar el spinner

    try {
      const nuevoComentario = {
        autor: "Ayudante", // Cambiar según el usuario autenticado
        contenido: responseText,
        fecha: new Date().toISOString(),
      };

      const response = await fetch(
        `https://backend-codezoo.onrender.com/api/foro/${selectedQuestion._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoComentario),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const foroData = await obtenerForo();
      setAcceptedQuestions(foroData.filter((q) => q.estado === "aprobada"));

      const updatedQuestion = foroData.find(
        (q) => q._id === selectedQuestion._id
      );

      setComments((prevComments) => ({
        ...prevComments,
        [selectedQuestion._id]: updatedQuestion?.comentarios || [],
      }));

      setResponseText("");
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  const handleDeleteComment = async (questionId, comentarioId) => {
    setLoading(true); // Activar el spinner
    try {
      const response = await eliminarComentario(questionId, comentarioId);

      if (response.error) {
        console.error("Error al eliminar el comentario:", response.error);
        return;
      }

      setComments((prevComments) => {
        const updatedComments = prevComments[questionId].filter(
          (comentario) => comentario._id !== comentarioId
        );
        return {
          ...prevComments,
          [questionId]: updatedComments,
        };
      });
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  return (
    <div className="forum-admin">
      <SidebarMenu />
      <div className="forum-content">
        <h1 className="forum-title">Gestión del foro</h1>
        <div className="forum-sections">
          {loading && <Spinner />} {/* Mostrar el Spinner mientras cargamos */}
          
          {/* Dudas Recibidas */}
          <div className="forum-panel">
            <h2>Dudas Recibidas</h2>
            <div className="questions-box">
              {receivedQuestions.map((question) => (
                <div key={question._id} className="question-item">
                  <p className="question-user">
                    <strong>{question.autor}</strong>
                  </p>
                  <p className="question-title">
                    <strong>{question.titulo}</strong>
                  </p>
                  <p className="question-text">{question.contenido}</p>
                  <p className="question-date">
                    {new Date(question.fecha).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="button-group">
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptQuestion(question)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleDeleteQuestion(question)}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dudas Aceptadas */}
          <div className="forum-panel">
            <h2>Dudas Aceptadas</h2>
            <div className="questions-box">
              {acceptedQuestions.map((question) => (
                <div key={question._id} className="question-item">
                  <p className="question-user">
                    <strong>{question.autor}</strong>
                  </p>
                  <p className="question-title">
                    <strong>{question.titulo}</strong>
                  </p>
                  <p className="question-text">{question.contenido}</p>
                  <p className="question-date">
                    {new Date(question.fecha).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* Botón para eliminar el foro */}
                  <div className="button-group">
                    <button
                      className="delete-forum-btn"
                      onClick={() => handleDeleteQuestion(question)} // Llama a la función para eliminar el foro
                    >
                      Eliminar Foro
                    </button>
                  </div>

                  <button
                    className="toggle-comments-btn"
                    onClick={() => toggleComments(question._id)}
                  >
                    {visibleComments[question._id]
                      ? "Ocultar comentarios"
                      : "Mostrar comentarios"}
                  </button>

                  {visibleComments[question._id] && (
                    <div className="comments-section">
                      <h3>Comentarios</h3>
                      {comments[question._id]?.length === 0 ? (
                        <p>No existen comentarios</p> // Mensaje si no hay comentarios
                      ) : (
                        comments[question._id]?.map((comentario, index) => (
                          <div
                            key={`${question._id}-comentario-${index}`}
                            className="comment-box"
                          >
                            <div className="comment-header">
                              <div className="user-avatar">
                                <img src={avatar} alt="Avatar del Ayudante" />
                              </div>
                              <p className="comment-author">
                                <strong>{comentario.autor}</strong>
                              </p>
                            </div>
                            <p className="comment-content">
                              {comentario.contenido}
                            </p>
                            <p className="question-date">
                              {new Date(comentario.fecha).toLocaleDateString(
                                "es-MX",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <div className="button-group">
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDeleteComment(
                                    question._id,
                                    comentario._id
                                  )
                                }
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ))
                      )}

                      {selectedQuestion &&
                        selectedQuestion._id === question._id && (
                          <div className="response-box">
                            <div className="user-avatar">
                              <img src={avatar} alt="Tu Avatar" />
                            </div>
                            <textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Escribe tu respuesta..."
                            />
                            <button
                              className="submit-btn"
                              onClick={handleSendResponse}
                            >
                              Enviar respuesta
                            </button>
                          </div>
                        )}
                    </div>
                  )}
                  <button
                    className="reply-btn"
                    onClick={() => setSelectedQuestion(question)}
                  >
                    Responder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumAdmin;
