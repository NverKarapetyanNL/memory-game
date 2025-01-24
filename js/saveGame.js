export async function saveGame(gameData) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('Je bent niet ingelogd. Log opnieuw in.');
        window.location.href = '/views/login.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const playerId = payload.sub; // Dit haalt de ID van de speler uit de JWT-token

    const requestData = {
        id: playerId,
        ...gameData,
    };

    try {
        const response = await fetch('http://localhost:8000/game/save', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Opslaan van het spel is mislukt.');
        }

        console.log('Spel succesvol opgeslagen in de database.');
        return response; // Je kunt dit weglaten als je niets hoeft te retourneren
    } catch (error) {
        console.error('Fout bij het opslaan van het spel:', error);
        throw error; // Gooi de fout opnieuw om die hogerop te kunnen afvangen
    }
}
