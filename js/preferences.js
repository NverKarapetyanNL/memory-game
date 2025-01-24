async function savePreferences(preferences) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('Je bent niet ingelogd. Je wordt doorgestuurd naar de inlogpagina.');
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`http://localhost:8000/api/player/${preferences.id}/preferences`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
    });

    if (response.status !== 204) {
        throw new Error('Voorkeuren opslaan mislukt');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const preferencesForm = document.getElementById('preferences-form');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await savePreferencesHandler();
        });
    } else {
        console.error('Preferences-formulier niet gevonden in de DOM.');
    }
});

async function savePreferencesHandler() {
    const playerId = localStorage.getItem('playerId');
    if (!playerId) {
        alert('Player ID is niet beschikbaar. Log opnieuw in.');
        return;
    }

    const preferences = {
        id: playerId,
        api: document.getElementById('image-source').value,
        color_found: document.getElementById('found-color').value,
        color_closed: document.getElementById('closed-color').value
    };

    try {
        document.getElementById('save-status').innerText = 'Bezig met opslaan...';
        await savePreferences(preferences);
        document.getElementById('save-status').innerText = 'Voorkeuren succesvol opgeslagen!';
        alert('Voorkeuren succesvol opgeslagen!');
    } catch (error) {
        document.getElementById('save-status').innerText = 'Opslaan mislukt.';
        console.error('Opslaan van voorkeuren is mislukt:', error);
        alert('Opslaan van voorkeuren is mislukt.');
    }
}
