import { Board } from './board.js';
import { fetchImages } from './api.js';
import { savePreferences } from './preferences.js';
import {saveGame} from "./saveGame.js";
import {fetchTopFive} from "./topFive.js";

export class Game {
    constructor(size, source, closedCharacter) {
        this.board = new Board(size, closedCharacter);
        this.source = source;
        this.closedCharacter = closedCharacter;
        this.firstCard = null;
        this.secondCard = null;
        this.pairsFound = 0;
        this.isProcessing = false;

        this.startTime = null;
        this.timerInterval = null;
        this.elapsedSeconds = 0;
        this.remainingSeconds = 300;
        this.totalPlayTime = [];
    }

    async startGame() {
        try {
            const symbols =
                this.source === 'letters' || this.source === 'numbers' || this.source === 'symbols'
                    ? this.generateSymbols()
                    : await fetchImages(this.source, (this.board.size * this.board.size) / 2);

            if (symbols.length !== this.board.size * this.board.size) {
                throw new Error('Aantal symbolen komt niet overeen met de bordgrootte.');
            }

            this.board.createBoard(symbols);
            this.pairsFound = 0;
            this.firstCard = null;
            this.secondCard = null;

            document.getElementById('found-pairs').innerText = this.pairsFound;

            this.resetTimers();
            this.startTimers();

            this.addEventListeners();
        } catch (error) {
            console.error('Fout bij het starten van het spel:', error);
            alert('Er ging iets mis bij het ophalen van de kaarten. Probeer het opnieuw.');
        }
    }

    resetTimers() {
        clearInterval(this.timerInterval);
        this.elapsedSeconds = 0;
        this.remainingSeconds = 300;
        document.getElementById('elapsed-time').innerText = '0 seconden';
        document.getElementById('progress-bar').style.width = '100%';
    }

    startTimers() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds++;
            this.remainingSeconds--;

            document.getElementById('elapsed-time').innerText = `${this.elapsedSeconds} seconden`;
            document.getElementById('rest-time').innerText = `${this.remainingSeconds} seconden`;

            document.getElementById('progress-bar').style.width = `${(this.remainingSeconds / 300) * 100}%`;

            if (this.remainingSeconds <= 0) {
                clearInterval(this.timerInterval);
                alert('Tijd is op! Probeer opnieuw.');
                this.endGame();
            }
        }, 1000);
    }
    endGame() {
        clearInterval(this.timerInterval);

        this.totalPlayTime.push(this.elapsedSeconds);

        const totalTime = this.totalPlayTime.reduce((acc, time) => acc + time, 0);
        const averageTime = Math.floor(totalTime / this.totalPlayTime.length);
        document.getElementById('average-time').innerText = `${averageTime} seconden`;

        alert(`Spel beëindigd! Je hebt ${this.pairsFound} paren gevonden.`);

        // Verzamel de gegevens die nodig zijn voor de backend
        const gameData = {
            score: this.pairsFound,
            api: this.source,
            color_found: document.getElementById('found-color').value,
            color_closed: document.getElementById('closed-color').value,
        };

        // Sla het spel op in de backend
        saveGame(gameData)
            .then(() => {
                console.log('Spel succesvol opgeslagen in de database.');
                fetchTopFive(); // Update de Top Five na het opslaan van het spel
            })
            .catch((error) => {
                console.error('Fout bij het opslaan van spelgegevens:', error);
                alert('Opslaan van het spel is mislukt.');
            });
    }



    addEventListeners() {
        this.board.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.handleTileClick(tile));
        });
    }

    generateSymbols() {
        const totalPairs = (this.board.size * this.board.size) / 2;

        if (this.source === 'letters') {
            return Array.from({ length: totalPairs }, (_, i) => String.fromCharCode(65 + i))
                .flatMap(symbol => [symbol, symbol])
                .sort(() => Math.random() - 0.5);
        } else if (this.source === 'numbers') {
            return Array.from({ length: totalPairs }, (_, i) => i + 1)
                .flatMap(number => [number, number])
                .sort(() => Math.random() - 0.5);
        } else if (this.source === 'symbols') {
            const baseSymbols = ['❤', '★', '☀', '☂', '♣', '♦', '♠', '♛', '⚽', '☕'];

            const repeatedSymbols = Array.from({ length: totalPairs }, (_, i) => baseSymbols[i % baseSymbols.length]);
            return repeatedSymbols
                .flatMap(symbol => [symbol, symbol])
                .sort(() => Math.random() - 0.5);
        }
        return [];
    }

    handleTileClick(tile) {
        if (this.isProcessing || tile.classList.contains('open') || tile.classList.contains('found')) {
            return;
        }

        tile.classList.add('open');
        const closedSymbol = tile.querySelector('.closed-symbol');
        if (closedSymbol) closedSymbol.style.display = 'none';

        const img = tile.querySelector('img');
        if (img) img.style.display = 'block';
        else tile.innerText = tile.dataset.value;

        if (!this.firstCard) {
            this.firstCard = tile;
        } else if (!this.secondCard) {
            this.secondCard = tile;
            this.checkMatch();
        }
    }

    checkMatch() {
        if (this.firstCard.dataset.value === this.secondCard.dataset.value) {
            this.firstCard.classList.add('found');
            this.secondCard.classList.add('found');
            this.firstCard = null;
            this.secondCard = null;
            this.pairsFound++;

            document.getElementById('found-pairs').innerText = this.pairsFound;

            if (this.pairsFound === (this.board.size * this.board.size) / 2) {
                alert('Gefeliciteerd! Je hebt alle paren gevonden!');
                this.endGame();
            }
        } else {
            this.isProcessing = true;
            setTimeout(() => {
                this.resetCard(this.firstCard);
                this.resetCard(this.secondCard);
                this.firstCard = null;
                this.secondCard = null;
                this.isProcessing = false;
            }, 1000);
        }
    }

    resetCard(card) {
        card.classList.remove('open');
        const closedSymbol = card.querySelector('.closed-symbol');
        if (closedSymbol) closedSymbol.style.display = 'block';

        const img = card.querySelector('img');
        if (img) img.style.display = 'none';
        else card.innerText = this.closedCharacter;
    }
}

// Start een nieuw spel en sla voorkeuren op
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

        // Sla voorkeuren op (optioneel)
        await savePreferences(preferences);

        const game = new Game(size, source, closedCharacter);
        await game.startGame();

        // Pas kleuren toe
        document.documentElement.style.setProperty('--closed-color', closedColor);
        document.documentElement.style.setProperty('--open-color', openColor);
        document.documentElement.style.setProperty('--found-color', foundColor);

        console.log('Nieuw spel gestart met aangepaste kleuren:', { closedColor, openColor, foundColor });
    } catch (error) {
        console.error('Fout bij het starten van een nieuw spel:', error);
        alert('Er ging iets mis bij het starten van een nieuw spel. Controleer de console voor meer details.');
    }
});
