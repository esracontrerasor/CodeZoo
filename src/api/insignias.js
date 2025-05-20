
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api/insignias`;

export const obtenerInsignias = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const obtenerInsignia = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

