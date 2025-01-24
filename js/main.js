import {Game} from "./game";

document.getElementById('new-game').addEventListener('click', () => {
    const size = parseInt(document.getElementById('board-size').value, 10);
    const source = document.getElementById('card-character').value;
    const closedCharacter = document.getElementById('closed-character').value;

    console.log('Nieuw spel gestart met instellingen:', { size, source, closedCharacter });

    const game = new Game(size, source, closedCharacter);
    game.startGame().then(() => console.log('Game gestart'));
});
