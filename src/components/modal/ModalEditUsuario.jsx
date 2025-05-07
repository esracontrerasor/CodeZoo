import React, { useState, useEffect } from 'react';
import '../../css/ModalEditUsuario.css'; // Asegúrate de tener este CSS para el modal

const ModalEditUsuario = ({ showModal, closeModal, usuario, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rol: '',
  });

  // Cuando el componente recibe un nuevo usuario, actualizar el formulario
  useEffect(() => {
    if (usuario) {
      setFormData({
        username: usuario.username || '',
        email: usuario.email || '',
        password: usuario.password || '',
        rol: usuario.rol || 'estudiante', // Por defecto 'estudiante'
      });
    }
  }, [usuario]);

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llamar a la función para guardar los datos
    onSave(formData);
    closeModal(); // Cerrar el modal después de guardar los cambios
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Rol</label>
            <select name="rol" value={formData.rol} onChange={handleChange} required>
              <option value="estudiante">Estudiante</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUsuario;
