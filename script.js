'use strict';

// Get DOM elements
const playerZeroTotal = document.querySelector('#score--0');
const playerOneTotal = document.querySelector('#score--1');

const playerZeroCurrent = document.querySelector('#current--0');
const playerOneCurrent = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');

let totalScores, currentScores, activePlayer;

function initializeGame() {
  totalScores = [0, 0];
  currentScores = [0, 0];
  activePlayer = 0;

  updateTotalScores();
  updateCurrentScores();
  switchActivePlayer(activePlayer);
  hideDice();
}

function updateTotalScores() {
  playerZeroTotal.textContent = totalScores[0];
  playerOneTotal.textContent = totalScores[1];
}

function updateCurrentScores() {
  playerZeroCurrent.textContent = currentScores[0];
  playerOneCurrent.textContent = currentScores[1];
}

function switchActivePlayer(player) {
  player0El.classList.toggle('player--active', player === 0);
  player1El.classList.toggle('player--active', player === 1);
}

function hideDice() {
  diceEl.classList.add('hidden');
}

function rollDice() {
  const diceVal = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceVal}.png`;

  if (diceVal === 1) {
    currentScores[activePlayer] = 0;
    updateCurrentScores();
    switchActivePlayer(activePlayer === 0 ? 1 : 0);
    activePlayer = activePlayer === 0 ? 1 : 0;
  } else {
    currentScores[activePlayer] += diceVal;
    updateCurrentScores();
  }
}

function holdScore() {
  totalScores[activePlayer] += currentScores[activePlayer];
  updateTotalScores();
  currentScores[activePlayer] = 0;
  updateCurrentScores();
  switchActivePlayer(activePlayer === 0 ? 1 : 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function resetGame() {
  initializeGame();
}

function startGame() {
  initializeGame();

  rollBtn.addEventListener('click', rollDice);
  holdBtn.addEventListener('click', holdScore);
  newGameBtn.addEventListener('click', resetGame);
}

startGame();
