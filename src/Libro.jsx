import React, { useState } from "react";
import "./css/Libro.css";
import Navbar from "./components/navbar/Navbar";
import CodeZooCat from "./CoodeZooCat";


const Libro = () => {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const generatePages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push({ id: i, flipping: false, flippingBack: false });
    }
    return pages;
  };

  const [pages, setPages] = useState(generatePages());

  // Funcion para pasar a la siguiente pagina
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
      }, 800);
    }
  };

  // Funcion para pasar a la pagina anterior
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

  // Ir a una pagina especifica
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
    const isFlipped = index === currentPage;
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
          <h3>Titulo</h3>
          <p>Aqui va el contenido</p>
          {index !== 0 && <div className="page-number"> Pagina {index}</div>}
        </div>
      </div>
    );
  }

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
                className={`indicator ${index === currentPage ? "active" : ''}`}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>

          <div className="book-navigation">
            <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}>←</button>
            <button className="nav-button" onClick={nextPage} disabled={currentPage === -1}>→</button>
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


