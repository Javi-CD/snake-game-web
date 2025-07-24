import './style.css';
import { GAME_STATES } from './config/gameConfig.js';
import { initializeCanvas } from './utils/canvasUtils.js';
import { elements } from './utils/domUtils.js';
import { GameEngine } from './game/GameEngine.js';
import { InputHandler } from './input/InputHandler.js';

// Game instances
let gameEngine = null;
let inputHandler = null;

/**
 * Setup canvas and initialize game engine
 */
function setupGame() {
  const { canvas, ctx } = initializeCanvas();

  // Initialize game engine
  gameEngine = new GameEngine(canvas, ctx);

  // Setup callbacks
  gameEngine.setScoreUpdateCallback(updateScoreDisplay);
  gameEngine.setGameOverCallback(handleGameOver);
  gameEngine.setGameStateChangeCallback(handleGameStateChange);

  // Initialize input handler
  inputHandler = new InputHandler();
  inputHandler.setDirectionChangeCallback(direction => {
    gameEngine.changeDirection(direction);
  });

  inputHandler.setGameActionCallback(action => {
    switch (action) {
      case 'toggle_pause':
        gameEngine.togglePause();
        break;
      case 'start_game':
        if (gameEngine.getGameState() === GAME_STATES.IDLE) {
          gameEngine.startGame();
        }
        break;
      case 'reset_game':
        gameEngine.resetGame();
        break;
    }
  });

  return { canvas, ctx };
}

/**
 * Update score display in UI
 * @param {number} currentScore - Current game score
 * @param {number} highScore - High score
 */
function updateScoreDisplay(currentScore, highScore) {
  elements.currentScore.textContent = currentScore;
  elements.highScore.textContent = highScore;
  elements.bestScore.textContent = highScore;
}

/**
 * Handle game over event
 * @param {number} finalScore - Final score
 * @param {number} highScore - High score
 * @param {boolean} isNewRecord - Whether this is a new high score
 */
function handleGameOver(finalScore, highScore, isNewRecord) {
  elements.finalScore.textContent = finalScore;
  elements.bestScore.textContent = highScore;

  // Show/hide new record message
  const newRecordElement = elements.gameOverModal.querySelector('.new-record');
  if (newRecordElement) {
    newRecordElement.style.display = isNewRecord ? 'block' : 'none';
  }

  // Show game over modal
  elements.gameOverModal.classList.remove('hidden');
}

/**
 * Handle game state changes
 * @param {string} newState - New game state
 */
function handleGameStateChange(newState) {
  switch (newState) {
    case GAME_STATES.PLAYING:
      elements.startBtn.disabled = true;
      elements.pauseBtn.disabled = false;
      elements.pauseBtn.textContent = 'Pause';
      elements.resetBtn.disabled = false;
      break;

    case GAME_STATES.PAUSED:
      elements.pauseBtn.textContent = 'Resume';
      break;

    case GAME_STATES.IDLE:
      elements.startBtn.disabled = false;
      elements.pauseBtn.disabled = true;
      elements.pauseBtn.textContent = 'Pause';
      elements.resetBtn.disabled = false;
      elements.gameOverModal.classList.add('hidden');
      break;

    case GAME_STATES.GAME_OVER:
      elements.startBtn.disabled = false;
      elements.pauseBtn.disabled = true;
      elements.pauseBtn.textContent = 'Pause';
      elements.resetBtn.disabled = false;
      break;
  }
}

/**
 * Initialize UI elements and set initial states
 */
function initializeUI() {
  // Hide game over modal initially
  elements.gameOverModal.classList.add('hidden');

  // Set initial score displays
  const initialHighScore = gameEngine ? gameEngine.getHighScore() : 0;
  updateScoreDisplay(0, initialHighScore);

  // Set initial button states
  handleGameStateChange(GAME_STATES.IDLE);
}

/**
 * Setup event listeners for game controls
 */
function setupEventListeners() {
  elements.startBtn.addEventListener('click', () => {
    if (gameEngine) {
      gameEngine.startGame();
    }
  });

  elements.pauseBtn.addEventListener('click', () => {
    if (gameEngine) {
      gameEngine.togglePause();
    }
  });

  elements.resetBtn.addEventListener('click', () => {
    if (gameEngine) {
      gameEngine.resetGame();
    }
  });

  elements.newGameBtn.addEventListener('click', () => {
    if (gameEngine) {
      elements.gameOverModal.classList.add('hidden');
      gameEngine.resetGame();
      gameEngine.startGame();
    }
  });
}

/**
 * Initialize the complete game
 */
function initializeGame() {
  setupGame();
  initializeUI();
  setupEventListeners();

  // Snake game fully initialized
  // Controls: Arrow keys or WASD to move, Space to pause, Enter to start, Escape to reset
}

// Start the application
initializeGame();
