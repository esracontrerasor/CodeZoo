import React, { useState } from "react";
import LibroViewer from "./components/LibroViewer";
import "./css/Libro.css";
import Navbar from "./components/navbar/navbar";
import CodeZooCat from "./CoodeZooCat";

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
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  return (
    <div className="contenedor-Libro">
      <header className="header-home">
        <Navbar />
      </header>
      <div className="background-fixed"></div> {/* Fondo separado */}
      {!libroSeleccionado ? (
        <div className="lista-libros">
          <h2>📚 Selecciona un libro</h2>
          <ul>
            {librosDisponibles.map((libro, i) => (
              <li key={i} onClick={() => setLibroSeleccionado(libro)}>
                {libro.titulo}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="lector-libro">
          <LibroViewer
            archivo={libroSeleccionado.archivo}
            onBack={() => setLibroSeleccionado(null)}
            />
            <button onClick={() => setLibroSeleccionado(null)} className="btn-volver">
            🔙 Volver a la lista
            </button>

        </div>
      )}
    </div>
  );
};

export default Libro;


