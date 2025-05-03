import React, { useState, useEffect } from 'react';
import '../../css/deleteConfirmationModal.css';
import chita_question from '../../resources/chita_question.png'; 

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  const [closing, setClosing] = useState(false);

  const handleCancel = () => {
    setClosing(true);
    setTimeout(() => {
      onCancel();
    }, 300); // Espera a que la animación termine antes de cerrar
  };

  return (
    <div className={`modal-overlay ${closing ? 'hidden' : ''}`}>
      <div className={`delete-modal ${closing ? 'hidden' : ''}`}>
        <img src={chita_question} alt="" className="welcome-image"/>
        <p className="modal-message">¿Estás seguro de eliminar esta actividad?</p>
        <div className="modal-buttons">
          <button className="btn confirm-btn" onClick={onConfirm}>ACEPTAR</button>
          <button className="btn cancel-btn" onClick={handleCancel}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
