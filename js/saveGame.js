export async function saveGame(gameData) {
    const token = localStorage.getItem('jwt');

    if (!token) {
        alert('Je moet ingelogd zijn om het spel op te slaan. Je wordt doorgestuurd naar de inlogpagina.');
        window.location.href = '/views/login.html';
        return;
    }

    let playerId;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        playerId = payload.sub;
    } catch (error) {
        console.error('Fout bij het decoderen van de JWT-token:', error);
        alert('Er is een probleem met je sessie. Log opnieuw in.');
        window.location.href = '/views/login.html';
        return;
    }

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
            let errorMessage = 'Opslaan van het spel is mislukt.';
            if (response.status === 500) {
                errorMessage = 'Er is een serverfout opgetreden. Probeer het later opnieuw.';
            } else if (response.status === 400) {
                errorMessage = 'Ongeldige gegevens. Controleer de ingevoerde gegevens.';
            }
            throw new Error(errorMessage);
        }

        console.log('Spel succesvol opgeslagen in de database.');
        return response;
    } catch (error) {
        console.error('Fout bij het opslaan van het spel:', error);
        alert(`Fout bij het opslaan van het spel: ${error.message}`);
        throw error;
    }
}
