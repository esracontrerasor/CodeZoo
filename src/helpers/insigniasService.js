export const obtenerInsigniasDelUsuario = async (username) => {
  try {
    const res = await fetch(`http://localhost:3000/api/insignias/${username}`);
    if (!res.ok) throw new Error("No se pudo obtener insignias");

    const insignias = await res.json();
    return insignias;
  } catch (error) {
    console.error("Error al obtener insignias:", error);
    return [];
  }
};
