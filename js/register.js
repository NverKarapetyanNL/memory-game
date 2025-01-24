document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error('Registreren mislukt');
        }

        alert('Registratie succesvol! Je kunt nu inloggen.');
        window.location.href = '/views/login.html';
    } catch (error) {
        console.error(error);
        alert('Er is een probleem met de registratie.');
    }
});