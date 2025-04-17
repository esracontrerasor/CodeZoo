const API_URL = 'http://localhost:3000/api/actividades';

export const obtenerActividades = async () => {
    const response = await fetch(API_URL);
     return response.json();
};

export const crearActividad = async (actividad) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(actividad),
    });
    return response.json();
};

export const actualizarActividad = async (id, actividad) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(actividad),
    });
    return response.json();
};

export const eliminarActividad = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE',});
    return response.json();
};

