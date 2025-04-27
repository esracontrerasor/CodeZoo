import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // Importamos useParams
import { motion } from "framer-motion";
import FlipPage from "react-pageflip";
import { books } from "./data/books"; // Importamos los libros
import "./css/AnimatedBook.css";
 
export default function AnimatedBook() { 
  const { bookKey } = useParams(); // Obtenemos bookKey desde la URL
  const [bookPosition, setBookPosition] = useState("start");
  const [isOpen, setIsOpen] = useState(false);
  const flipPageRef = useRef(null);
  const pages = books[bookKey] || []; // Obtenemos el libro según la clave recibida

  useEffect(() => {
    setTimeout(() => setBookPosition("center"), 1000);
  }, []);

  if (pages.length === 0) {
    return <h2>📚 Libro no encontrado</h2>;
  }

  return (
    <div className="book-container">
      <motion.div
        initial={{ x: "100vw", y: "-50vh", rotate: 15 }}
        animate={{ x: bookPosition === "center" ? 0 : "100vw", y: 0, rotate: 0 }}
        transition={{ duration: 1 }}
        className="book-wrapper"
      >
        {!isOpen ? (
          <div className="cover w-full h-full flex items-center justify-center text-3xl cursor-pointer" onClick={() => setIsOpen(true)}>
            Portada
          </div>
        ) : (
          <FlipPage ref={flipPageRef} width={600} height={664} className="flipbook-container" showCover={true} useMouseEvents={true} useTouchEvents={true} flipOnClick={false}>
            {pages.map((page, index) => (
              <div key={index} className="flipbook-page" onClick={(e) => {
                const clickPosition = e.clientX;
                const pageWidth = e.target.offsetWidth;
                clickPosition < pageWidth / 2 ? flipPageRef.current.flipPrev() : flipPageRef.current.flipNext();
              }}>
                <div className="page-title">{page.title}</div>
                <div className="page-content">{page.content}</div>
              </div>
            ))}
          </FlipPage>
        )}
      </motion.div>
    </div>
  );
}