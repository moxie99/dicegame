'use strict';
// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdScoreButton = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// current score for dice result
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// switch players
const switchPlayers = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// starting game condition
score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden');

// rollling dice functionality
rollButton.addEventListener('click', () => {
  if (playing) {
    // generating dice outcome
    const diceResult = Math.trunc(Math.random() * 6) + 1;

    //   displaying the result as an image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceResult}.png`;

    //   if dice outcome is not 1
    if (diceResult !== 1) {
      currentScore += diceResult;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

holdScoreButton.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent = `wins`;
    } else {
      switchPlayers();
    }
  }
});

newGameButton.addEventListener('click', () => {
  window.location.reload();
});
