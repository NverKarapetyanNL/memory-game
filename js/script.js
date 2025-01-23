let firstCard = null;
let secondCard = null;
let pairsFound = 0;

function generateSymbols(size) {
    const totalPairs = (size * size) / 2;
    const symbols = Array.from({ length: totalPairs }, (_, i) => String.fromCharCode(65 + i)); // A, B, C...
    return [...symbols, ...symbols].sort(() => Math.random() - 0.5); // Dupliceren en schudden
}

function generateCards(size) {
    const symbols = generateSymbols(size);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Reset het bord
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Pas grid aan

    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card', 'closed');
        card.dataset.value = symbol;
        card.innerText = '?'; // Default gesloten status
        card.addEventListener('click', () => flipCard(card)); // Voeg klik-logica toe
        gameBoard.appendChild(card);
    });

    pairsFound = 0; // Reset gevonden paren
    document.getElementById('found-pairs').innerText = pairsFound;
}

function flipCard(card) {
    if (card.classList.contains('open') || card.classList.contains('found')) return;

    card.classList.add('open');
    card.innerText = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    } else {
        // Sluit vorige kaarten als er een derde kaart wordt geklikt
        resetOpenCards();
        firstCard = card;
        secondCard = null;
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Match gevonden
        firstCard.classList.add('found');
        secondCard.classList.add('found');
        firstCard = null;
        secondCard = null;
        pairsFound++;
        document.getElementById('found-pairs').innerText = pairsFound;

        // Winconditie
        if (pairsFound === (parseInt(document.getElementById('board-size').value) ** 2) / 2) {
            alert('Gefeliciteerd! Je hebt alle paren gevonden!');
        }
    } else {
        // Geen match, sluit kaarten
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.innerText = '?';
            secondCard.innerText = '?';
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function resetOpenCards() {
    document.querySelectorAll('.card.open:not(.found)').forEach(card => {
        card.classList.remove('open');
        card.innerText = '?';
    });
}

// Start spel
document.getElementById('start-game').addEventListener('click', () => {
    const size = parseInt(document.getElementById('board-size').value);
    generateCards(size);
});
