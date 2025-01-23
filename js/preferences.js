// preferences.js
async function savePreferences(preferences) {
    const token = localStorage.getItem('jwt');

    const response = await fetch('http://localhost:8000/preferences', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
    });

    if (!response.ok) {
        throw new Error('Voorkeuren opslaan mislukt');
    }
}

document.getElementById('preferences-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const preferences = {
        imageSource: document.getElementById('image-source').value,
        closedColor: document.getElementById('closed-color').value,
        foundColor: document.getElementById('found-color').value,
        email: document.getElementById('email').value
    };

    try {
        await savePreferences(preferences);
        alert('Voorkeuren succesvol opgeslagen!');
    } catch (error) {
        console.error(error);
        alert('Opslaan van voorkeuren is mislukt.');
    }
});
