const originalFetch = window.fetch;

window.fetch = async (...args) => {
    const token = localStorage.getItem('jwt');
    args[1] = args[1] || {};
    args[1].headers = args[1].headers || {};

    if (token) {
        args[1].headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await originalFetch(...args);

        if (response.status === 401) {
            alert('Sessie verlopen. Log opnieuw in.');
            window.location.href = 'views/login.html';
        }

        return response;
    } catch (error) {
        console.error('Fetch-fout:', error);
        throw error;
    }
};
