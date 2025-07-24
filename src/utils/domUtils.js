/**
 * DOM element selectors and utilities
 */
export const DOM_ELEMENTS = {
  canvas: '#gameCanvas',
  score: '#score',
  highScore: '#highScore',
  startBtn: '#startBtn',
  pauseBtn: '#pauseBtn',
  resetBtn: '#resetBtn',
  gameOverModal: '#gameOverModal',
  finalScore: '#finalScore',
  newHighScore: '#newHighScore',
  playAgainBtn: '#playAgainBtn',
  // Mobile controls
  upBtn: '#upBtn',
  downBtn: '#downBtn',
  leftBtn: '#leftBtn',
  rightBtn: '#rightBtn',
};

/**
 * Get DOM element by selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} The DOM element
 */
export function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * Get all DOM elements needed for the game
 * @returns {Object} Object containing all DOM elements
 */
export function getAllElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(DOM_ELEMENTS)) {
    elements[key] = getElement(selector);
  }

  return elements;
}

/**
 * Update score display
 * @param {HTMLElement} scoreElement - Score display element
 * @param {number} score - Current score
 */
export function updateScore(scoreElement, score) {
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

/**
 * Update high score display
 * @param {HTMLElement} highScoreElement - High score display element
 * @param {number} highScore - High score value
 */
export function updateHighScore(highScoreElement, highScore) {
  if (highScoreElement) {
    highScoreElement.textContent = highScore;
  }
}

/**
 * Show game over modal
 * @param {HTMLElement} modal - Game over modal element
 * @param {HTMLElement} finalScoreElement - Final score display element
 * @param {HTMLElement} newHighScoreElement - New high score message element
 * @param {number} finalScore - Final score
 * @param {boolean} isNewHighScore - Whether this is a new high score
 */
export function showGameOverModal(
  modal,
  finalScoreElement,
  newHighScoreElement,
  finalScore,
  isNewHighScore
) {
  if (modal) {
    modal.classList.remove('hidden');
  }

  if (finalScoreElement) {
    finalScoreElement.textContent = finalScore;
  }

  if (newHighScoreElement) {
    newHighScoreElement.style.display = isNewHighScore ? 'block' : 'none';
  }
}

/**
 * Hide game over modal
 * @param {HTMLElement} modal - Game over modal element
 */
export function hideGameOverModal(modal) {
  if (modal) {
    modal.classList.add('hidden');
  }
}

/**
 * Toggle button states
 * @param {HTMLElement} startBtn - Start button element
 * @param {HTMLElement} pauseBtn - Pause button element
 * @param {boolean} isPlaying - Whether game is currently playing
 */
export function toggleButtonStates(startBtn, pauseBtn, isPlaying) {
  if (startBtn) {
    startBtn.disabled = isPlaying;
  }

  if (pauseBtn) {
    pauseBtn.disabled = !isPlaying;
  }
}
