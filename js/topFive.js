// topFive.js
export async function fetchTopFive() {
    const token = localStorage.getItem('jwt');

    const response = await fetch('http://localhost:8000/scores', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Scores ophalen mislukt');
    }

    return await response.json();
}

// Tonen in de UI
document.addEventListener('DOMContentLoaded', async () => {
    const topFiveList = document.getElementById('top-five');

    try {
        const scores = await fetchTopFive();
        scores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.name}: ${score.score}`;
            topFiveList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert('Kan de top vijf niet laden.');
    }
});
