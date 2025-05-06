import React, { useEffect, useState } from 'react';
import './css/UserManagement.css';
import SideMenu from './components/SidebarMenu';
import { Pencil, X } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/usuarios') // Asegúrate de que esta URL sea correcta
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
      const res = await fetch(`http://localhost:3000/api/foro/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || 'No se pudo eliminar el usuario');
        return;
      }

      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <div className="user-management-layout">
      <SideMenu />

      <main className="user-management-container">
        <div className="user-management-card">
          <h2 className="user-management-title">
            Gestión de usuarios <span className="emoji">👤</span>
          </h2>

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
                          <button className="edit-button">
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
      </main>
    </div>
  );
}
