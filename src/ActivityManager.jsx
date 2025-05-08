import React, { useState } from 'react';
import './css/ActivityManager.css';
import { FiEdit2 } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import SidebarMenu from './components/SidebarMenu';
import DeleteConfirmationModal from './components/modal/DeleteConfirmationModal';
import SuccessModal from './components/modal/SuccessModal';
import Spinner from './components/spinner'

const ActivityManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para la pantalla de carga
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    { title: 'Bucles en JavaScript', description: 'Aprende a usar bucles for y while', type: 'Cuento', date: '15/04/2025' },
    { title: 'Bucles en JavaScript', description: 'Aprende a usar bucles for y while', type: 'Cuento', date: '16/04/2025' },
  ];

  const handleDeleteClick = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true); // Muestra pantalla de carga
    try {
      // Simulación de una llamada a la base de datos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false); // Oculta pantalla de carga
      setShowSuccessModal(true); // Muestra el modal de éxito
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
      setIsLoading(false); // Oculta pantalla de carga en caso de error
    }
    closeModal(); // Cierra el modal de confirmación
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="activity-container">
      <SidebarMenu />
      <main className="main-content-activity">
        <h1 className="main-title">Gestión de actividades 📅</h1>
        <div className="table-box">
          <div className="table-header">
            <input type="text" placeholder="Buscar usuarios" className="search-bar" />
            <button className="create-btn">Crear +</button>
          </div>
          <table className="activity-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{act.title}</td>
                  <td>{act.description}</td>
                  <td>{act.type}</td>
                  <td>{act.date}</td>
                  <td>
                    <FiEdit2 className="icon-btn" />
                    <RxCross2 className="icon-btn" onClick={() => handleDeleteClick(act)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {isLoading && <Spinner/>}
      {showModal && (
        <DeleteConfirmationModal onConfirm={handleConfirmDelete} onCancel={closeModal} />
      )}
      {showSuccessModal && (
        <SuccessModal onClose={closeSuccessModal} />
      )}
    </div>
  );
};

export default ActivityManager;
