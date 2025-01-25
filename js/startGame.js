import {savePreferences} from "./preferences.js";
import {Game} from "./game.js";

document.getElementById('new-game').addEventListener('click', async () => {
    try {
        const size = parseInt(document.getElementById('board-size').value);
        const source = document.getElementById('card-character').value;
        const closedCharacter = document.getElementById('closed-character').value;

        const closedColor = document.getElementById('closed-color').value;
        const openColor = document.getElementById('open-color').value;
        const foundColor = document.getElementById('found-color').value;

        const preferences = {
            preferred_api: source,
            preferred_color_closed: closedColor,
            preferred_color_found: foundColor,
        };

        await savePreferences(preferences);

        const game = new Game(size, source, closedCharacter);
        await game.startGame();

        document.documentElement.style.setProperty('--closed-color', closedColor);
        document.documentElement.style.setProperty('--open-color', openColor);
        document.documentElement.style.setProperty('--found-color', foundColor);

        console.log('Nieuw spel gestart met aangepaste kleuren:', {closedColor, openColor, foundColor});
    } catch (error) {
        console.error('Fout bij het starten van een nieuw spel:', error);
        alert('Er ging iets mis bij het starten van een nieuw spel. Controleer de console voor meer details.');
    }
});