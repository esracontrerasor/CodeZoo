const API_URL = 'http://localhost:3000/api/foro';

export const obtenerForo = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const crearForo = async (foro) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foro),
    });
    return response.json();
};

export const actualizarForo = async (id, foro) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(foro),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el foro:", error.message);
        return { error: error.message };
    }
};


export const eliminarForo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE' 
    });
    return response.json();
};

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
    const response = await fetch(`http://localhost:3000/api/foro/${id}/comentarios/${comentarioId}`, {
        method: 'DELETE',
    });
    return response.json();
};

