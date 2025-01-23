const gameBoard = document.getElementById('game-board');
const progressBar = document.getElementById('progress-bar');
const elapsedTime = document.getElementById('elapsed-time');
const foundPairs = document.getElementById('found-pairs');

let timer = null;
let pairs = 0;

// Genereer kaarten
function generateCards(size = 6) {
    const totalCards = size * size;
    const values = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    const cardValues = [...values, ...values].sort(() => Math.random() - 0.5);

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = '?';
        gameBoard.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
    });
}

// Kaarten omdraaien
function flipCard(card) {
    if (card.classList.contains('open') || card.classList.contains('found')) return;

    card.classList.add('open');
    card.innerText = card.dataset.value;

    const openCards = document.querySelectorAll('.card.open:not(.found)');
    if (openCards.length === 2) {
        checkMatch(openCards);
    }
}

// Controleren op een match
function checkMatch(cards) {
    const [card1, card2] = cards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('found');
        card2.classList.add('found');
        card1.classList.remove('open');
        card2.classList.remove('open');
        pairs++;
        foundPairs.innerText = pairs;
    } else {
        setTimeout(() => {
            card1.classList.remove('open');
            card2.classList.remove('open');
            card1.innerText = '?';
            card2.innerText = '?';
        }, 1000);
    }
}

// Timer en progress bar
function startTimer() {
    let time = 60;
    timer = setInterval(() => {
        time--;
        elapsedTime.innerText = 60 - time;
        progressBar.style.width = `${(time / 60) * 100}%`;

        if (time === 0) {
            clearInterval(timer);
            alert('Tijd is voorbij!');
        }
    }, 1000);
}

// Nieuw spel starten
document.getElementById('new-game').addEventListener('click', () => {
    gameBoard.innerHTML = '';
    pairs = 0;
    foundPairs.innerText = pairs;
    elapsedTime.innerText = '0';
    clearInterval(timer);
    startTimer();
    generateCards(6);
});

// Initieel spel starten
generateCards(6);
startTimer();
