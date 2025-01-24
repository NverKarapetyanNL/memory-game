export async function fetchTopFive() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        alert('Je moet ingelogd zijn om deze pagina te bekijken.');
        window.location.href = '/views/login.html';
        return;
    }

    const response = await fetch('http://localhost:8000/scores', {
        headers: {'Authorization': `Bearer ${token}`}
    });

    if (response.status === 401) {
        alert('Je sessie is verlopen. Log opnieuw in.');
        localStorage.removeItem('jwt');
        window.location.href = '/views/login.html';
        return;
    }

    if (!response.ok) {
        throw new Error('Scores ophalen mislukt');
    }

    return await response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    const topFiveList = document.getElementById('top-five');

    try {
        const scores = await fetchTopFive();
        console.log('Scores ontvangen van backend:', scores);
        if (!scores) return;

        scores.forEach(score => {
            const username = score.username || 'Onbekend';
            const value = score.score || 0;

            const li = document.createElement('li');
            li.textContent = `${username}: ${value}`;
            topFiveList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert('Kan de top vijf niet laden.');
    }
});
