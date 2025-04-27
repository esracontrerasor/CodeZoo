import React, { useState, useEffect } from "react";
import LibroViewer from "./components/LibroViewer";
import "./css/Libro.css";
import welcomeImg from "../src/resources/cocodrilo_img.png";
import Navbar from "./components/navbar/navbar";
import Swal from "sweetalert2"; 
import withReactContent from "sweetalert2-react-content";
import CodeZooCat from "./CoodeZooCat";

const MySwal = withReactContent(Swal);

const librosDisponibles = [
  {
    titulo: "Cuento del Libro de los Nombres",
    archivo: "/Libros/Cuento_nombres.pdf"
  },
  {
    titulo: "Inventario de la Jungla",
    archivo: "/Libros/Inventario_jungla.pdf"
  }
];

const Libro = () => {
  const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  useEffect(() => {
    if (mostrarBienvenida) {
      MySwal.fire({
        title: <strong>¡Bienvenido a la sección de libros!</strong>,
        html: (
          <div>
            <img src={welcomeImg} alt="" width="150" height="150" />
            <p style={{ fontSize: "16px", fontWeight: "500" }}>
              Diviértete aprendiendo y leyendo grandes aventuras.
            </p>
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
      });
    }
  }, [mostrarBienvenida]); // <-- Importante poner la dependencia

  return (
    <div className="contenedor-Libro">
      <header className="header-home">
        <Navbar />
      </header>
      <div className="background-fixed"></div>
  
      <div className="seccion-principal">
        {/* Columna Izquierda */}
        <div className="columna-libros">
          <h3>Libros disponibles</h3>
          <ul>
            {librosDisponibles.map((libro, i) => (
              <li key={i} onClick={() => setLibroSeleccionado(libro)}>
                {libro.titulo}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Centro */}
        <div className="columna-lector">
          {!libroSeleccionado ? (
            <h2>📚 Selecciona un libro</h2>
          ) : (
            <>
              <LibroViewer
                archivo={libroSeleccionado.archivo}
                onBack={() => setLibroSeleccionado(null)}
              />
              <button
                onClick={() => setLibroSeleccionado(null)}
                className="btn-volver"
              >
                🔙 Volver a la lista
              </button>
            </>
          )}
        </div>
  
        {/* Columna Derecha */}
        <div className="columna-anuncios">
          <div className="anuncio-falso">Google Adds</div>
        </div>
      </div>
      <CodeZooCat />
    </div>
  );
  
};

export default Libro;

