const API_URL = 'http://localhost:3000/api/foro';

export const obtenerForo = async () => {
    const response = await fetch(API_URL);
    const datos = await response.json();
    return datos;
};

export const crearForo = async (foro) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foro),
    });
    const datos = await response.json();
    return datos;
};

export const actualizarForo = async (id, foro) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foro),
    });
    const datos = await response.json();
    return datos;
};

export const eliminarForo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE' 
    });
    const datos = await response.json();
    return datos;
};

// Comentarios
export const agregarComentario = async (id, comentario) => {
    const response = await fetch(`${API_URL}/${id}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentario),
    });
    return response.json();
};

export const obtenerComentarios = async (id) => {
    const response = await fetch(`${API_URL}/${id}/comentarios`);
    return response.json();
};

export const editarComentario = async (id, comentario) => {
    const response = await fetch(`${API_URL}/${id}/comentarios/${comentario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentario),
    });
    return response.json();
};

export const eliminarComentario = async (id, comentarioId) => {
    const response = await fetch(`${API_URL}/${id}/comentarios/${comentarioId}`, {
        method: 'DELETE',
    });
    return response.json();
};