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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    return response.json();
};

