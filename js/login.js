document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/login_check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            throw new Error('Inloggen mislukt');
        }

        const { token } = await response.json();
        localStorage.setItem('jwt', token);
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Inloggen is mislukt.');
    }
});