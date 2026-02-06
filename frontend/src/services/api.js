const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    let data = null;
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    }

    if (!response.ok) {
        // Gestion des messages d'erreurs humains
        if (response.status === 401) throw new Error("Email ou mot de passe incorrect.");
        if (response.status === 404) throw new Error("Ce compte n'existe pas.");
        if (response.status === 409) throw new Error("Cet email est déjà utilisé.");

        const errorMessage = data?.message || 'Une erreur est survenue';
        throw new Error(errorMessage);
    }
    return data || { success: true };
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const apiService = {
    login: (credentials) =>
        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(handleResponse),

    register: (userData) =>
        fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData) // Doit contenir full_name, email, password
        }).then(handleResponse),

    getTasks: () => {
        const userId = localStorage.getItem('userId');
        return fetch(`${API_URL}/tasks/${userId}`, {
            headers: getHeaders()
        }).then(handleResponse);
    },

    addTask: (taskData) => {
        return fetch(`${API_URL}/tasks/add`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                ...taskData,
                user_id: localStorage.getItem('userId') // Lien clé étrangère
            })
        }).then(handleResponse);
    },

    updateTaskStatus: (id, newStatus) =>
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ is_done: newStatus })
        }).then(handleResponse),

    deleteTask: (id) =>
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        }).then(handleResponse),

    clearCompleted: () => {
        const userId = localStorage.getItem('userId');
        return fetch(`${API_URL}/tasks/clear-completed/${userId}`, {
            method: 'DELETE',
            headers: getHeaders()
        }).then(handleResponse);
    }
};