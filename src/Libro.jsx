import React, { useState, useEffect } from "react";
import "./css/Libro.css";
import Navbar from "./components/navbar/Navbar";
import CodeZooCat from "./CoodeZooCat";
import swal from "sweetalert2";
import { mostrarInsignia } from "./helpers/insigniasHelper";

const Libro = () => {
  const totalPages = 10;
  const libroId = "libro-1"; // CAMBIA a "libro-2" en el segundo libro
  const [currentPage, setCurrentPage] = useState(0);

  const generatePages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push({ id: i, flipping: false, flippingBack: false });
    }
    return pages;
  };

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

        // === LÓGICA DE INSIGNIAS ===
        const username = localStorage.getItem("username");
        if (!username) return;

        const mostrados = JSON.parse(localStorage.getItem("swalsMostrados")) || {};

        // Explorador de Ideas → al pasar de la página 0 a la 1 del libro 1
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

        // Lector Estrella → al pasar de la página 1 a la 2 del libro 2
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
    if (pageNumber === currentPage || pageNumber < 0 || pageNumber >= totalPages) {
      return;
    }

    if (pageNumber > currentPage) {
      for (let i = currentPage + 1; i <= pageNumber; i++) {
        setTimeout(() => {
          setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[i].flipping = true;
            return updatedPages;
          });

          setTimeout(() => {
            setPages(prevPages => {
              const finalPages = [...prevPages];
              finalPages[i].flipping = false;
              return finalPages;
            });
            if (i === pageNumber) {
              setCurrentPage(pageNumber);
            }
          }, 800);
        }, (i - currentPage - 1) * 400);
      }
    } else {
      for (let i = currentPage; i > pageNumber; i--) {
        setTimeout(() => {
          setPages(prevPages => {
            const updatedPages = [...prevPages];
            updatedPages[i].flippingBack = true;
            return updatedPages;
          });

          setTimeout(() => {
            setPages(prevPages => {
              const finalPages = [...prevPages];
              finalPages[i].flippingBack = false;
              return finalPages;
            });
            if (i === pageNumber + 1) {
              setCurrentPage(pageNumber);
            }
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
          <h3>Título</h3>
          <p>Aquí va el contenido</p>
          {index !== 0 && <div className="page-number"> Página {index}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="libro-container">
      <Navbar />
      <div className="book-content">
        <div className="book-sidebar">
          <h3>Libros disponibles</h3>
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
