// src/pages/Libro.jsx
import { libros } from "./data/Libros";
import React, { useState, useEffect } from "react";
import "./css/Libro.css";
import Navbar from "./components/navbar/Navbar";
import CodeZooCat from "./CoodeZooCat";
import swal from "sweetalert2";
import { mostrarInsignia } from "./helpers/insigniasHelper";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";  // Asegúrate de agregar esta línea


const Libro = () => {
  const { libroId } = useParams();
  const libro = libros[libroId];

  if (!libro) return <div>📚 Libro no encontrado</div>;

  const totalPages = libro.paginas.length;
  const [currentPage, setCurrentPage] = useState(0);

  const generatePages = () =>
    Array.from({ length: totalPages }, (_, i) => ({
      id: i,
      flipping: false,
      flippingBack: false
    }));

  const [pages, setPages] = useState(generatePages());

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      const newPages = [...pages];
      newPages[currentPage + 1].flipping = true;
      setPages(newPages);

      setTimeout(() => {
        const updatedPages = [...newPages];
        updatedPages[currentPage + 1].flipping = false;
        setPages(updatedPages);
        setCurrentPage(currentPage + 1);

        const username = localStorage.getItem("username");
        if (!username) return;

        const mostrados = JSON.parse(localStorage.getItem("swalsMostrados")) || {};

        if (libroId === "libro-1" && currentPage === 0 && !mostrados?.[username]?.exploradorIdeas) {
          mostrarInsignia({
            nombre: "Explorador de Ideas",
            descripcion: "Iniciaste tu primera lectura en CodeZoo",
            fecha: new Date().toLocaleDateString(),
            imagenUrl: "/insignias/explorador de ideas.png"
          });

          const updated = {
            ...mostrados,
            [username]: {
              ...(mostrados[username] || {}),
              exploradorIdeas: true
            }
          };
          localStorage.setItem("swalsMostrados", JSON.stringify(updated));

          swal.fire({
            title: "¡Explorador de Ideas! 📘",
            text: "Has iniciado tu primera lectura.",
            icon: "success",
            confirmButtonText: "Ir al perfil",
            showCancelButton: true,
            cancelButtonText: "Cerrar"
          }).then(res => {
            if (res.isConfirmed) window.location.href = "/perfil";
          });
        }

        if (libroId === "libro-2" && currentPage === 3 && !mostrados?.[username]?.lectorEstrella) {
          mostrarInsignia({
            nombre: "Lector estrella",
            descripcion: "Leíste varias páginas de un libro en CodeZoo",
            fecha: new Date().toLocaleDateString(),
            imagenUrl: "/insignias/Lector estrella.png"
          });

          const updated = {
            ...mostrados,
            [username]: {
              ...(mostrados[username] || {}),
              lectorEstrella: true
            }
          };
          localStorage.setItem("swalsMostrados", JSON.stringify(updated));

          swal.fire({
            title: "¡Lector Estrella! 🌟",
            text: "Has leído varias páginas de tu libro.",
            icon: "success",
            confirmButtonText: "Ir al perfil",
            showCancelButton: true,
            cancelButtonText: "Cerrar"
          }).then(res => {
            if (res.isConfirmed) window.location.href = "/perfil";
          });
        }
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      const newPages = [...pages];
      newPages[currentPage].flippingBack = true;
      setPages(newPages);

      setTimeout(() => {
        const updatedPages = [...newPages];
        updatedPages[currentPage].flippingBack = false;
        setPages(updatedPages);
        setCurrentPage(currentPage - 1);
      }, 800);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber === currentPage || pageNumber < 0 || pageNumber >= totalPages) return;

    if (pageNumber > currentPage) {
      for (let i = currentPage + 1; i <= pageNumber; i++) {
        setTimeout(() => {
          setPages(prev => {
            const updated = [...prev];
            updated[i].flipping = true;
            return updated;
          });

          setTimeout(() => {
            setPages(prev => {
              const finalPages = [...prev];
              finalPages[i].flipping = false;
              return finalPages;
            });
            if (i === pageNumber) setCurrentPage(pageNumber);
          }, 800);
        }, (i - currentPage - 1) * 400);
      }
    } else {
      for (let i = currentPage; i > pageNumber; i--) {
        setTimeout(() => {
          setPages(prev => {
            const updated = [...prev];
            updated[i].flippingBack = true;
            return updated;
          });

          setTimeout(() => {
            setPages(prev => {
              const finalPages = [...prev];
              finalPages[i].flippingBack = false;
              return finalPages;
            });
            if (i === pageNumber + 1) setCurrentPage(pageNumber);
          }, 800);
        }, (currentPage - i) * 400);
      }
    }
  };

  const renderPageContent = (page, index) => {
    const isFlipped = index <= currentPage;
    let className = "page";

    if (page.flipping) className += " flipping";
    if (page.flippingBack) className += " flipping-back";

    return (
      <div
        key={page.id}
        className={className}
        style={{
          zIndex: totalPages - index,
          transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)"
        }}
      >
        <div className="page-content">
          <img src={libro.paginas[index]} alt={`Página ${index + 1}`} className="page-image" />
          {index !== 0 && <div className="page-number">Página {index}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="libro-container">
      <Navbar />
      <div className="book-content">
        <div className="book-sidebar">
          <h3>{libro.titulo}</h3>
          {/* Lista de libros disponibles */}
          <div className="available-books">
            <h4>Libros Disponibles</h4>
              {Object.keys(libros).map((key) => (
                <li key={key}>
                  <Link to={`/libro/${key}`} className="book-link">
                    {libros[key].titulo}
                  </Link>
                </li>
              ))}
          </div>
        </div>

        <div className="book-area">
          <div className="book-container">
            <div className="book">
              {pages.map((page, index) => renderPageContent(page, index))}
            </div>
          </div>

          <div className="page-indicators">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentPage ? "active" : ""}`}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>

          <div className="book-navigation">
            <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>←</button>
            <button className="nav-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>→</button>
          </div>
        </div>

        <div className="ad-sidebar">
          <h3>Publicidad</h3>
        </div>
      </div>
    </div>
  );
};

export default Libro;
