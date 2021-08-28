'use strict';

//initialize
const scoreEl0 = document.querySelector('#score--0'); //select ID with querySelector has to add #
const scoreEl1 = document.getElementById('score--1'); // select ID with getElementbyID only id name
const diceEl = document.querySelector('.dice'); // select class with . access
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const nameEl0 = document.querySelector('#name--0');
const nameEl1 = document.querySelector('#name--1');

let currentScore, activePlayer, playing, scores;

//starting condition
const init = function () {
  playing = true;
  scores = [0, 0];
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//rolling a dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //switch player condition
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //adding / removing class from classList only class name without .
      diceEl.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
