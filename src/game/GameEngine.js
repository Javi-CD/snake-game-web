import { Snake } from '../entities/Snake.js';
import { Food } from '../entities/Food.js';
import { CollisionDetector } from './CollisionDetector.js';
import { GAME_CONFIG, GAME_STATES } from '../config/gameConfig.js';
import { clearCanvas, drawRect } from '../utils/canvasUtils.js';
import { COLORS } from '../config/gameConfig.js';

/**
 * Main game engine that handles game logic, updates, and rendering
 */
export class GameEngine {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.snake = new Snake();
    this.food = new Food();
    this.gameState = GAME_STATES.IDLE;
    this.score = 0;
    this.highScore = this.loadHighScore();
    this.gameLoopId = null;
    this.lastUpdateTime = 0;
    this.updateInterval = GAME_CONFIG.GAME_SPEED;

    // Callbacks
    this.onScoreUpdate = null;
    this.onGameOver = null;
    this.onGameStateChange = null;

    // Initialize food position
    this.food.generateNewPosition(this.snake.getSegments());
  }

  /**
   * Set callback for score updates
   * @param {Function} callback - Function to call when score changes
   */
  setScoreUpdateCallback(callback) {
    this.onScoreUpdate = callback;
  }

  /**
   * Set callback for game over events
   * @param {Function} callback - Function to call when game ends
   */
  setGameOverCallback(callback) {
    this.onGameOver = callback;
  }

  /**
   * Set callback for game state changes
   * @param {Function} callback - Function to call when game state changes
   */
  setGameStateChangeCallback(callback) {
    this.onGameStateChange = callback;
  }

  /**
   * Start the game
   */
  startGame() {
    if (
      this.gameState === GAME_STATES.IDLE ||
      this.gameState === GAME_STATES.GAME_OVER
    ) {
      this.score = 0;
      this.updateInterval = GAME_CONFIG.GAME_SPEED;
      this.snake.reset();
      this.food.generateNewPosition(this.snake.getSegments());

      if (this.onScoreUpdate) {
        this.onScoreUpdate(this.score, this.highScore);
      }
    }

    this.gameState = GAME_STATES.PLAYING;
    this.lastUpdateTime = performance.now();

    if (this.onGameStateChange) {
      this.onGameStateChange(this.gameState);
    }

    this.gameLoop();
  }

  /**
   * Pause the game
   */
  pauseGame() {
    if (this.gameState === GAME_STATES.PLAYING) {
      this.gameState = GAME_STATES.PAUSED;
      if (this.gameLoopId) {
        cancelAnimationFrame(this.gameLoopId);
        this.gameLoopId = null;
      }

      if (this.onGameStateChange) {
        this.onGameStateChange(this.gameState);
      }
    }
  }

  /**
   * Resume the game
   */
  resumeGame() {
    if (this.gameState === GAME_STATES.PAUSED) {
      this.gameState = GAME_STATES.PLAYING;
      this.lastUpdateTime = performance.now();

      if (this.onGameStateChange) {
        this.onGameStateChange(this.gameState);
      }

      this.gameLoop();
    }
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    if (this.gameState === GAME_STATES.PLAYING) {
      this.pauseGame();
    } else if (this.gameState === GAME_STATES.PAUSED) {
      this.resumeGame();
    }
  }

  /**
   * Reset the game to initial state
   */
  resetGame() {
    this.gameState = GAME_STATES.IDLE;
    this.score = 0;
    this.updateInterval = GAME_CONFIG.GAME_SPEED;

    this.snake.reset();
    this.food.generateNewPosition(this.snake.getSegments());

    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }

    if (this.onScoreUpdate) {
      this.onScoreUpdate(this.score, this.highScore);
    }

    if (this.onGameStateChange) {
      this.onGameStateChange(this.gameState);
    }

    this.render();
  }

  /**
   * Handle snake direction change
   * @param {Object} direction - New direction object
   */
  changeDirection(direction) {
    if (this.gameState === GAME_STATES.PLAYING) {
      this.snake.setDirection(direction);
    }
  }

  /**
   * Main game loop
   */
  gameLoop() {
    const currentTime = performance.now();

    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      this.update();
      this.lastUpdateTime = currentTime;
    }

    this.render();

    if (this.gameState === GAME_STATES.PLAYING) {
      this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
    }
  }

  /**
   * Update game logic
   */
  update() {
    if (this.gameState !== GAME_STATES.PLAYING) return;

    // Move snake
    this.snake.move();

    // Check collisions
    const gridSize = GAME_CONFIG.CANVAS_SIZE / GAME_CONFIG.GRID_SIZE;
    const collisions = CollisionDetector.checkAllCollisions(
      this.snake.getSegments(),
      gridSize,
      gridSize
    );

    if (collisions.hasCollision()) {
      this.endGame();
      return;
    }

    // Check food collision
    if (
      CollisionDetector.checkFoodCollision(
        this.snake.getHead(),
        this.food.getPosition()
      )
    ) {
      this.handleFoodEaten();
    }
  }

  /**
   * Handle food being eaten
   */
  handleFoodEaten() {
    this.snake.grow();
    this.score += GAME_CONFIG.POINTS_PER_FOOD;

    // Increase speed slightly
    this.updateInterval = Math.max(
      this.updateInterval * GAME_CONFIG.SPEED_INCREASE_FACTOR,
      GAME_CONFIG.MAX_SPEED
    );

    // Generate new food
    this.food.generateNewPosition(this.snake.getSegments());

    // Update score
    if (this.onScoreUpdate) {
      this.onScoreUpdate(this.score, this.highScore);
    }
  }

  /**
   * End the game
   */
  endGame() {
    this.gameState = GAME_STATES.GAME_OVER;

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }

    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }

    if (this.onGameOver) {
      this.onGameOver(this.score, this.highScore, this.score > this.highScore);
    }

    if (this.onGameStateChange) {
      this.onGameStateChange(this.gameState);
    }
  }

  /**
   * Render the game
   */
  render() {
    // Clear canvas
    clearCanvas(this.ctx, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    // Draw snake
    this.snake.getSegments().forEach((segment, index) => {
      const color = index === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY;
      drawRect(
        this.ctx,
        segment.x * GAME_CONFIG.GRID_SIZE,
        segment.y * GAME_CONFIG.GRID_SIZE,
        GAME_CONFIG.GRID_SIZE - 1, // -1 for grid lines
        GAME_CONFIG.GRID_SIZE - 1,
        color
      );
    });

    // Draw food
    const foodPos = this.food.getPosition();
    drawRect(
      this.ctx,
      foodPos.x * GAME_CONFIG.GRID_SIZE,
      foodPos.y * GAME_CONFIG.GRID_SIZE,
      GAME_CONFIG.GRID_SIZE - 1,
      GAME_CONFIG.GRID_SIZE - 1,
      COLORS.FOOD
    );
  }

  /**
   * Draw grid lines
   */
  drawGrid() {
    this.ctx.strokeStyle = COLORS.GRID;
    this.ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= GAME_CONFIG.CANVAS_SIZE; x += GAME_CONFIG.GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, GAME_CONFIG.CANVAS_SIZE);
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= GAME_CONFIG.CANVAS_SIZE; y += GAME_CONFIG.GRID_SIZE) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(GAME_CONFIG.CANVAS_SIZE, y);
      this.ctx.stroke();
    }
  }

  /**
   * Get current game state
   * @returns {string} Current game state
   */
  getGameState() {
    return this.gameState;
  }

  /**
   * Get current score
   * @returns {number} Current score
   */
  getScore() {
    return this.score;
  }

  /**
   * Get high score
   * @returns {number} High score
   */
  getHighScore() {
    return this.highScore;
  }

  /**
   * Load high score from localStorage
   * @returns {number} Saved high score or 0
   */
  loadHighScore() {
    try {
      return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
    } catch {
      // Could not load high score
      return 0;
    }
  }

  /**
   * Save high score to localStorage
   */
  saveHighScore() {
    try {
      localStorage.setItem('snakeHighScore', this.highScore.toString());
    } catch {
      // Could not save high score
    }
  }
}
