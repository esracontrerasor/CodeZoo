const API_URL = 'http://localhost:3000/api/insignias';

export const obtenerInsignias = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const obtenerInsignia = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

