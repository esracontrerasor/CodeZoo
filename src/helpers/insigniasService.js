export const obtenerInsigniasDelUsuario = async (username) => {
  try {
    const res = await fetch(`https://backend-codezoo.onrender.com/api/insignias/${username}`);
    if (!res.ok) throw new Error("No se pudo obtener insignias");

    const insignias = await res.json();
    return insignias;
  } catch (error) {
    console.error("Error al obtener insignias:", error);
    return [];
  }
};
