const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Eliminar usuario
export async function eliminarUsuario(id) {
  const res = await fetch(`${API_BASE_URL}/api/usuarios/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Actualizar usuario
export async function actualizarUsuario(id, data) {
  const res = await fetch(`${API_BASE_URL}/api/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
