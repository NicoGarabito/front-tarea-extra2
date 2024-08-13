const cards = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H'
];

let gameBoard = document.querySelector('.game-board');
let moveCounter = document.getElementById('move-counter');
let resetButton = document.getElementById('reset-button');
let selectedCards = [];
let matchedCards = 0;
let moves = 0;

resetButton.addEventListener('click', resetGame);

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCardElement(content) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.content = content;

    let front = document.createElement('div');
    front.classList.add('front');
    front.textContent = content;
    card.appendChild(front);

    let back = document.createElement('div');
    back.classList.add('back');
    card.appendChild(back);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            checkMatch();
            moves++;
            moveCounter.textContent = moves;
        }
    }
}

function checkMatch() {
    let [firstCard, secondCard] = selectedCards;
    if (firstCard.dataset.content === secondCard.dataset.content) {
        matchedCards += 2;
        selectedCards = [];

        if (matchedCards === cards.length * 2) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            selectedCards = [];
        }, 1000);
    }
}

function startGame() {
    let shuffledCards = shuffle([...cards, ...cards]);
    shuffledCards.forEach(content => {
        let card = createCardElement(content);
        gameBoard.appendChild(card);
    });
}

function resetGame() {
    gameBoard.innerHTML = '';
    moves = 0;
    moveCounter.textContent = moves;
    selectedCards = [];
    matchedCards = 0;
    startGame();
}

startGame();
