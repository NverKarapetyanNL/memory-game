async function fetchImages(source, count) {
    if (source === 'dogs') {
        const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
        const data = await res.json();
        return [...data.message, ...data.message];
    } else if (source === 'cats') {
        return Array.from({ length: count }, () => `https://cataas.com/cat?width=100&height=100&random=${Math.random()}`);
    } else if (source === 'lorem') {
        return Array.from({ length: count }, (_, i) => `https://picsum.photos/id/${i + 10}/100/100`);
    }
    return [];
}

async function generateCards(size) {
    const source = document.getElementById('card-character').value;
    const totalPairs = (size * size) / 2;
    const symbols = source === 'letters' || source === 'numbers' || source === 'symbols'
        ? generateSymbols(size)
        : await fetchImages(source, totalPairs);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card', 'closed');
        if (typeof symbol === 'string' && symbol.startsWith('http')) {
            const img = document.createElement('img');
            img.src = symbol;
            img.alt = 'Memory kaart';
            card.dataset.value = symbol;
            card.appendChild(img);
        } else {
            card.dataset.value = symbol;
            card.innerText = '?';
        }
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    pairsFound = 0;
    document.getElementById('found-pairs').innerText = pairsFound;
}
