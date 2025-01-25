export async function fetchTopFive() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        alert('Je moet ingelogd zijn om deze pagina te bekijken.');
        window.location.href = '/views/login.html';
        return;
    }

    const response = await fetch('http://localhost:8000/scores', {
        headers: {'Authorization': `Bearer ${token}`},
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

export function updateTopFiveList(scores) {
    const topFiveList = document.getElementById('top-five');
    topFiveList.innerHTML = '';

    const sortedScores = scores.sort((a, b) => b.score - a.score);

    sortedScores.slice(0, 5).forEach((score) => {
        const username = score.username || 'Onbekend';
        const value = score.score.toFixed(1) || 0;

        const li = document.createElement('li');
        li.textContent = `${username}: ${value}`;

        topFiveList.appendChild(li);
    });

    console.log('Top vijf lijst bijgewerkt en gesorteerd.');
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const scores = await fetchTopFive();
        if (scores) {
            updateTopFiveList(scores);
        }
    } catch (error) {
        console.error('Fout bij het laden van de top vijf:', error);
        alert('Kan de top vijf niet laden.');
    }
});
