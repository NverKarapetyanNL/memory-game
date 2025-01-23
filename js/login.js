// login.js
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/login_check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Inloggen mislukt');
        }

        const { token } = await response.json();
        localStorage.setItem('jwt', token);
        window.location.href = 'game.html'; // Redirect naar het spel
    } catch (error) {
        console.error(error);
        alert('Inloggen is mislukt.');
    }
});
