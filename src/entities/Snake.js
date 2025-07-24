import { GAME_CONFIG, DIRECTIONS } from '../config/gameConfig.js';

/**
 * Snake entity class that handles the snake's position, movement, and growth
 */
export class Snake {
  constructor() {
    this.segments = [
      { x: 10, y: 10 }, // Starting position in grid coordinates
    ];
    this.direction = DIRECTIONS.RIGHT;
    this.nextDirection = DIRECTIONS.RIGHT;
    this.hasGrown = false;
  }

  /**
   * Get the head position of the snake
   * @returns {Object} Head position with x and y coordinates
   */
  getHead() {
    return this.segments[0];
  }

  /**
   * Get all snake segments
   * @returns {Array} Array of segments with x and y coordinates
   */
  getSegments() {
    return this.segments;
  }

  /**
   * Set the next direction for the snake
   * Prevents the snake from moving in the opposite direction
   * @param {Object} newDirection - Direction object with x and y values
   */
  setDirection(newDirection) {
    // Prevent moving in opposite direction
    if (
      this.direction.x + newDirection.x === 0 &&
      this.direction.y + newDirection.y === 0
    ) {
      return;
    }
    this.nextDirection = newDirection;
  }

  /**
   * Move the snake one step forward
   */
  move() {
    // Update direction
    this.direction = this.nextDirection;

    // Calculate new head position
    const head = this.getHead();
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    // Add new head
    this.segments.unshift(newHead);

    // Remove tail if snake hasn't grown
    if (!this.hasGrown) {
      this.segments.pop();
    } else {
      this.hasGrown = false;
    }
  }

  /**
   * Make the snake grow by one segment
   */
  grow() {
    this.hasGrown = true;
  }

  /**
   * Check if the snake collides with itself
   * @returns {boolean} True if collision detected
   */
  checkSelfCollision() {
    const head = this.getHead();
    return this.segments
      .slice(1)
      .some(segment => segment.x === head.x && segment.y === head.y);
  }

  /**
   * Check if the snake collides with walls
   * @returns {boolean} True if collision detected
   */
  checkWallCollision() {
    const head = this.getHead();
    const gridSize = GAME_CONFIG.CANVAS_SIZE / GAME_CONFIG.GRID_SIZE;

    return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
  }

  /**
   * Reset the snake to initial state
   */
  reset() {
    this.segments = [{ x: 10, y: 10 }];
    this.direction = DIRECTIONS.RIGHT;
    this.nextDirection = DIRECTIONS.RIGHT;
    this.hasGrown = false;
  }

  /**
   * Get the current length of the snake
   * @returns {number} Number of segments
   */
  getLength() {
    return this.segments.length;
  }
}
