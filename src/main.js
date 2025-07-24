import './style.css';
import { GAME_CONFIG, GAME_STATES } from './config/gameConfig.js';
import { initializeCanvas } from './utils/canvasUtils.js';
import {
  getAllElements,
  updateScore,
  updateHighScore,
  hideGameOverModal,
  toggleButtonStates,
} from './utils/domUtils.js';

// Get all DOM elements
const elements = getAllElements();
let ctx = null;

// Initialize canvas and get context
function setupCanvas() {
  if (elements.canvas) {
    ctx = initializeCanvas(elements.canvas);
  }
}

// Game state variables
let gameState = GAME_STATES.IDLE;
let score = 0;
const highScore = localStorage.getItem('snakeHighScore') || 0;

// Initialize UI
function initializeUI() {
  // Update score displays
  updateScore(elements.score, score);
  updateHighScore(elements.highScore, highScore);

  // Hide game over modal
  hideGameOverModal(elements.gameOverModal);

  // Set initial button states
  toggleButtonStates(elements.startBtn, elements.pauseBtn, false);
}

// Event listeners for game controls
function setupEventListeners() {
  if (elements.startBtn) {
    elements.startBtn.addEventListener('click', () => {
      // Start game - Placeholder
      gameState = GAME_STATES.PLAYING;
      toggleButtonStates(elements.startBtn, elements.pauseBtn, true);
    });
  }

  if (elements.pauseBtn) {
    elements.pauseBtn.addEventListener('click', () => {
      // Pause game - Placeholder
      gameState = GAME_STATES.PAUSED;
      toggleButtonStates(elements.startBtn, elements.pauseBtn, false);
    });
  }

  if (elements.resetBtn) {
    elements.resetBtn.addEventListener('click', () => {
      // Reset game - Placeholder
      gameState = GAME_STATES.IDLE;
      score = 0;
      updateScore(elements.score, score);
      hideGameOverModal(elements.gameOverModal);
      toggleButtonStates(elements.startBtn, elements.pauseBtn, false);
    });
  }

  if (elements.playAgainBtn) {
    elements.playAgainBtn.addEventListener('click', () => {
      // Play again - Placeholder
      gameState = GAME_STATES.IDLE;
      score = 0;
      updateScore(elements.score, score);
      hideGameOverModal(elements.gameOverModal);
      toggleButtonStates(elements.startBtn, elements.pauseBtn, false);
    });
  }
}

// Initialize the game
function initializeGame() {
  setupCanvas();
  initializeUI();
  setupEventListeners();
}

// Start the application
initializeGame();
