document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwt');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const playerName = payload.username || 'Speler';

        const logoutContainer = document.getElementById('logout-container');
        logoutContainer.innerHTML = `
                <span>Welcome, ${playerName}</span>
                <button id="logout-button">Log out</button>
            `;

        document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.removeItem('jwt');
            alert('Uitgelogd!');
            window.location.href = '/views/login.html';
        });
    }
});