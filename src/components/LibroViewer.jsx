import React from "react";

const LibroViewer = ({ archivo }) => {
  return (
    <div className="lector-libro">
      <div className="background-fixed"></div> {/* Fondo separado */}

      <div className="visor-pdf-contenedor">
        <div className="visor-pdf-fondo">
          <iframe
            src={archivo}
            width="100%"
            height="600px"
            title="Visor de PDF"
            className="visor-pdf"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LibroViewer;

