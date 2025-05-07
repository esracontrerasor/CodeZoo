const API_URL = 'http://localhost:3000/api/usuarios';

export const obtenerUsuarios = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const crearUsuario = async (usuario) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    return response.json();
};

export const actualizarUsuario = async (id, usuario) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',  // Cambiar el método a PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo actualizar el usuario');
    }

    return response.json();
};

export const eliminarUsuario = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo eliminar el usuario');
    }

    return response.json();
};

