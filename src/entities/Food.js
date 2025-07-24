import { GAME_CONFIG } from '../config/gameConfig.js';

/**
 * Food entity class that handles food generation and positioning
 */
export class Food {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.generateNewPosition();
  }

  /**
   * Get the current food position
   * @returns {Object} Position with x and y coordinates
   */
  getPosition() {
    return this.position;
  }

  /**
   * Generate a new random position for the food
   * @param {Array} snakeSegments - Array of snake segments to avoid collision
   */
  generateNewPosition(snakeSegments = []) {
    const gridSize = GAME_CONFIG.CANVAS_SIZE / GAME_CONFIG.GRID_SIZE;
    let newPosition;
    let isValidPosition = false;

    // Keep generating until we find a position not occupied by the snake
    while (!isValidPosition) {
      newPosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };

      // Check if position is not occupied by snake
      isValidPosition = !snakeSegments.some(
        segment => segment.x === newPosition.x && segment.y === newPosition.y
      );
    }

    this.position = newPosition;
  }

  /**
   * Check if the food is eaten by the snake
   * @param {Object} snakeHead - Snake head position
   * @returns {boolean} True if food is eaten
   */
  isEaten(snakeHead) {
    return this.position.x === snakeHead.x && this.position.y === snakeHead.y;
  }

  /**
   * Reset food to a new random position
   * @param {Array} snakeSegments - Array of snake segments to avoid collision
   */
  reset(snakeSegments = []) {
    this.generateNewPosition(snakeSegments);
  }
}
