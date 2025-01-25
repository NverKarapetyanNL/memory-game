async function updateEmail(email) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error('Je moet ingelogd zijn om deze pagina te bekijken.');
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const playerId = payload.sub;
    if (!playerId) {
        throw new Error('Player ID is niet beschikbaar.');
    }

    const response = await fetch(`http://localhost:8000/api/player/${playerId}/email`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    if (response.status === 401) {
        throw new Error('Je sessie is verlopen. Log opnieuw in.');
    }

    if (response.status !== 204) {
        throw new Error('Het bijwerken van de e-mail is mislukt. Controleer je invoer en probeer het opnieuw.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            try {
                document.getElementById('save-status').innerText = 'E-mail wordt bijgewerkt...';
                await updateEmail(email);
                document.getElementById('save-status').innerText = 'E-mail succesvol bijgewerkt!';
                alert('E-mail succesvol bijgewerkt!');
            } catch (error) {
                console.error('Fout bij het bijwerken van de e-mail:', error);
                document.getElementById('save-status').innerText = 'Bijwerken mislukt.';
                alert(error.message);
            }
        });
    } else {
        console.error('Het formulier voor e-mail bijwerken is niet gevonden.');
    }
});
