export class Board {
    constructor(size) {
        this.size = size;
        this.boardElement = document.getElementById('game-board');
        this.tiles = [];
    }

    createBoard(symbolList) {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.tiles = []; // Reset tiles-array

        symbolList.forEach(symbol => {
            const tile = document.createElement('div');
            tile.classList.add('card', 'closed');
            tile.dataset.value = symbol;
            tile.innerText = '?';
            this.boardElement.appendChild(tile);
            this.tiles.push(tile);
        });
    }

    resetTiles() {

        this.tiles.forEach(tile => {
            if (!tile.classList.contains('found')) {
                tile.classList.remove('open');
                tile.innerText = '?';
            }
        });
    }

    disableTiles() {
        this.tiles.forEach(tile => tile.classList.add('disabled'));
    }

    enableTiles() {
        this.tiles.forEach(tile => tile.classList.remove('disabled'));
    }
}
