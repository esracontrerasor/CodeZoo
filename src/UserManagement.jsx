import React, { useEffect, useState } from 'react';
import './css/UserManagement.css';
import SideMenu from './components/SidebarMenu';
import { Pencil, X } from 'lucide-react';
import { eliminarUsuario, actualizarUsuario } from '../src/api/usuarios'; // Ajusta el path según tu estructura
// ajusta esta ruta según tu estructura
import ModalEditUsuario from './components/modal/ModalEditUsuario';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // Para guardar el usuario que estamos editando
  const [showModal, setShowModal] = useState(false); // Controlar la visibilidad del modal

  useEffect(() => {
    fetch('https://backend-codezoo.onrender.com/api/usuarios') // Asegúrate de que esta URL sea correcta
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar usuarios:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmDelete) return;
  
    try {
      await eliminarUsuario(id);
      setUsers(prev => prev.filter(user => user._id !== id));
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert(error.message || 'Error al eliminar el usuario');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Guardamos el usuario a editar
    setShowModal(true); // Mostramos el modal
  };

  const handleSave = async (formData) => {
    try {
      await actualizarUsuario(selectedUser._id, formData); // Llamamos a la API para actualizar el usuario
      setUsers(users.map(user => (user._id === selectedUser._id ? { ...user, ...formData } : user))); // Actualizamos la lista de usuarios
      alert('Usuario actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert(error.message || 'Error al actualizar el usuario');
    }
  };

  return (
    <div className="user-management-layout">
      <SideMenu />

      <div className="user-management-container">
        <h2 className="user-management-title"> Gestión de usuarios <span className="emoji">👤</span> </h2>
        <div className="user-management-card">
          <div className="user-table-wrapper">
            <input
              type="text"
              placeholder="Buscar usuarios"
              className="search-input"
            />

            {loading ? (
              <p className="loading-text">Cargando usuarios...</p>
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Correo electrónico</th>
                    <th>Rol</th>
                    <th>Progreso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.rol === 'estudiante')
                    .map((user) => (
                      <tr key={user._id} className="user-row">
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                            alt="avatar"
                            className="avatar"
                          />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.rol || 'Usuario común'}</td>
                        <td>
                          {Array.isArray(user.progreso) && user.progreso.length > 0
                            ? user.progreso[user.progreso.length - 1].porcentaje + '%'
                            : '0%'}
                        </td>
                        <td className="action-buttons">
                          <button className="edit-button" onClick={() => handleEdit(user)}>
                            <Pencil size={18} />
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(user._id)}
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ModalEditUsuario
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        usuario={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
}
