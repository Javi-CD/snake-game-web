import './style.css';

// Basic Temporary Configuration for Testing

// Elements del Dom
const scoreElement = document.querySelector('#score');
const highScoreElement = document.querySelector('#highScore');

// Temporary state variables
let score = 0;
const highScore = localStorage.getItem('snakeHighScore') || 0;

// Update initial UI
if (scoreElement) scoreElement.textContent = score;
if (highScoreElement) highScoreElement.textContent = highScore;

// Basic event listeners for testing
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resetBtn = document.querySelector('#resetBtn');

if (startBtn) {
  startBtn.addEventListener('click', () => {
    // Started game -Placeholder
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    // Paused game -Placeholder
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Restarted game -Placeholder
    score = 0;
    if (scoreElement) scoreElement.textContent = score;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
}

// Initial configuration completed
