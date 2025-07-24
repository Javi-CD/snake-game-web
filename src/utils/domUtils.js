/**
 * DOM element selectors and utilities
 */
const DOM_SELECTORS = {
  canvas: '#gameCanvas',
  currentScore: '#score',
  highScore: '#highScore',
  startBtn: '#startBtn',
  pauseBtn: '#pauseBtn',
  resetBtn: '#resetBtn',
  gameOverModal: '#gameOverModal',
  finalScore: '#finalScore',
  bestScore: '#bestScore',
  newGameBtn: '#playAgainBtn',
  // Mobile controls
  upBtn: '#up-btn',
  downBtn: '#down-btn',
  leftBtn: '#left-btn',
  rightBtn: '#right-btn',
};

/**
 * Get DOM element by selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} The DOM element
 */
function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * All DOM elements needed for the game
 */
export const elements = Object.entries(DOM_SELECTORS).reduce(
  (acc, [key, selector]) => {
    acc[key] = getElement(selector);
    return acc;
  },
  {}
);

/**
 * Update score display
 * @param {number} score - Current score
 */
export function updateScore(score) {
  if (elements.currentScore) {
    elements.currentScore.textContent = score;
  }
}

/**
 * Update high score display
 * @param {number} highScore - High score value
 */
export function updateHighScore(highScore) {
  if (elements.highScore) {
    elements.highScore.textContent = highScore;
  }
  if (elements.bestScore) {
    elements.bestScore.textContent = highScore;
  }
}

/**
 * Show game over modal
 * @param {number} finalScore - Final score
 * @param {boolean} isNewHighScore - Whether this is a new high score
 */
export function showGameOverModal(finalScore, isNewHighScore) {
  if (elements.gameOverModal) {
    elements.gameOverModal.classList.remove('hidden');
  }

  if (elements.finalScore) {
    elements.finalScore.textContent = finalScore;
  }

  const newRecordElement = elements.gameOverModal.querySelector('.new-record');
  if (newRecordElement) {
    newRecordElement.style.display = isNewHighScore ? 'block' : 'none';
  }
}

/**
 * Hide game over modal
 */
export function hideGameOverModal() {
  if (elements.gameOverModal) {
    elements.gameOverModal.classList.add('hidden');
  }
}

/**
 * Update button states based on game state
 * @param {string} gameState - Current game state
 */
export function updateButtonStates(gameState) {
  if (!elements.startBtn || !elements.pauseBtn || !elements.resetBtn) return;

  switch (gameState) {
    case 'RUNNING':
      elements.startBtn.disabled = true;
      elements.pauseBtn.disabled = false;
      elements.pauseBtn.textContent = 'Pause';
      elements.resetBtn.disabled = false;
      break;

    case 'PAUSED':
      elements.startBtn.disabled = true;
      elements.pauseBtn.disabled = false;
      elements.pauseBtn.textContent = 'Resume';
      elements.resetBtn.disabled = false;
      break;

    case 'STOPPED':
    case 'GAME_OVER':
      elements.startBtn.disabled = false;
      elements.pauseBtn.disabled = true;
      elements.pauseBtn.textContent = 'Pause';
      elements.resetBtn.disabled = gameState === 'STOPPED';
      break;
  }
}
