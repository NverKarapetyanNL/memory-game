export async function savePreferences(preferences) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('Je moet ingelogd zijn om deze pagina te bekijken.');
        window.location.href = 'login.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const playerId = payload.sub;

    const formattedPreferences = {
        api: preferences.preferred_api, // Verander preferred_api naar api
        color_closed: preferences.preferred_color_closed,
        color_found: preferences.preferred_color_found,
    };

    const response = await fetch(`http://localhost:8000/api/player/${playerId}/preferences`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPreferences),
    });

    if (!response.ok) {
        throw new Error('Opslaan van voorkeuren mislukt.');
    }
    console.log('Voorkeuren succesvol opgeslagen in de database.');
}
