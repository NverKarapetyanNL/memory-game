export class Board {
    constructor(size, closedCharacter) {
        this.size = size;
        this.closedCharacter = closedCharacter;
        this.boardElement = document.getElementById('game-board');
        this.tiles = [];
    }

    createBoard(symbolList) {
        this.boardElement.innerHTML = '';
        this.boardElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        symbolList.forEach(symbol => {
            const tile = document.createElement('div');
            tile.classList.add('card', 'closed');
            tile.dataset.value = symbol;

            const closedSymbol = document.createElement('span');
            closedSymbol.classList.add('closed-symbol');
            closedSymbol.innerText = this.closedCharacter;
            tile.appendChild(closedSymbol);

            if (typeof symbol === 'string' && symbol.startsWith('http')) {
                const img = document.createElement('img');
                img.src = symbol;
                img.alt = 'Memory kaart';
                img.style.display = 'none';
                tile.appendChild(img);
            }

            this.tiles.push(tile);
            this.boardElement.appendChild(tile);
            this.tiles.push(tile);
        });
    }
}
