import React from 'react';
import '../../css/deleteConfirmationModal.css';
import chita_ok from '../../resources/chita_ok.png'; 

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <img src={chita_ok} alt="" className="welcome-image"/>
        <p className="modal-message">¡Actividad eliminada!</p>
        <div className="modal-buttons">
          <button className="btn confirm-btn" onClick={onClose}>CONTINUAR</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;