import {Board} from './board.js';

class Game {
    constructor(size) {
        this.board = new Board(size);
        this.firstCard = null;
        this.secondCard = null;
        this.pairsFound = 0;
        this.timer = null;
        this.isProcessing = false;
    }

    startGame(symbolList) {
        this.board.createBoard(symbolList);
        this.pairsFound = 0;
        this.firstCard = null;
        this.secondCard = null;

        document.getElementById('found-pairs').innerText = this.pairsFound;
        this.addEventListeners();
    }

    addEventListeners() {
        this.board.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.handleTileClick(tile));
        });
    }

    handleTileClick(tile) {
        if (this.isProcessing || tile.classList.contains('open') || tile.classList.contains('found')) {
            return;
        }

        tile.classList.add('open');
        tile.innerText = tile.dataset.value;

        if (!this.firstCard) {

            this.firstCard = tile;
        } else if (!this.secondCard) {
            // Tweede kaart
            this.secondCard = tile;
            this.checkMatch();
        } else {

            this.board.resetTiles();
            this.firstCard = tile;
            this.secondCard = null;
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
            this.checkWinCondition();
        } else {

            this.isProcessing = true;
            setTimeout(() => {
                this.firstCard.classList.remove('open');
                this.secondCard.classList.remove('open');
                this.firstCard.innerText = '?';
                this.secondCard.innerText = '?';
                this.firstCard = null;
                this.secondCard = null;
                this.isProcessing = false;
            }, 1000);
        }
    }

    checkWinCondition() {
        const totalPairs = (this.board.size * this.board.size) / 2;
        if (this.pairsFound === totalPairs) {
            alert('Gefeliciteerd! Je hebt alle paren gevonden!');
        }
    }
}


function generateSymbols(size) {
    const type = document.getElementById('card-character').value;
    const totalPairs = (size * size) / 2;
    if (type === 'letters') {
        const symbols = Array.from({ length: totalPairs }, (_, i) => String.fromCharCode(65 + i)); // A, B, C...
        return [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    } else if (type === 'numbers') {
        const numbers = Array.from({ length: totalPairs }, (_, i) => i + 1);
        return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    } else if (type === 'symbols') {
        const symbols = ['❤', '★', '☀', '☂', '♣', '♦', '♠', '♛', '⚽', '☕']; // Pas hier aan
        return [...symbols.slice(0, totalPairs), ...symbols.slice(0, totalPairs)].sort(() => Math.random() - 0.5);
    }
    return [];
}



document.getElementById('new-game').addEventListener('click', () => {
    const size = parseInt(document.getElementById('board-size').value);
    const symbols = generateSymbols(size);
    const game = new Game(size);
    game.startGame(symbols);
});
