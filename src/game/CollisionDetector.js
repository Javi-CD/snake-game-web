/**
 * Collision detection utility class for the snake game
 */
export class CollisionDetector {
  /**
   * Check if two positions are the same
   * @param {Object} pos1 - First position with x and y
   * @param {Object} pos2 - Second position with x and y
   * @returns {boolean} True if positions match
   */
  static positionsMatch(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  /**
   * Check if snake head collides with food
   * @param {Object} snakeHead - Snake head position
   * @param {Object} foodPosition - Food position
   * @returns {boolean} True if collision detected
   */
  static checkFoodCollision(snakeHead, foodPosition) {
    return this.positionsMatch(snakeHead, foodPosition);
  }

  /**
   * Check if snake collides with itself
   * @param {Array} snakeSegments - Array of snake segments
   * @returns {boolean} True if self collision detected
   */
  static checkSelfCollision(snakeSegments) {
    if (snakeSegments.length < 2) return false;

    const head = snakeSegments[0];
    const body = snakeSegments.slice(1);

    return body.some(segment => this.positionsMatch(head, segment));
  }

  /**
   * Check if snake collides with walls
   * @param {Object} snakeHead - Snake head position
   * @param {number} gridWidth - Grid width in cells
   * @param {number} gridHeight - Grid height in cells
   * @returns {boolean} True if wall collision detected
   */
  static checkWallCollision(snakeHead, gridWidth, gridHeight) {
    return (
      snakeHead.x < 0 ||
      snakeHead.x >= gridWidth ||
      snakeHead.y < 0 ||
      snakeHead.y >= gridHeight
    );
  }

  /**
   * Check all collision types for the snake
   * @param {Array} snakeSegments - Array of snake segments
   * @param {number} gridWidth - Grid width in cells
   * @param {number} gridHeight - Grid height in cells
   * @returns {Object} Object with collision results
   */
  static checkAllCollisions(snakeSegments, gridWidth, gridHeight) {
    const head = snakeSegments[0];

    return {
      wall: this.checkWallCollision(head, gridWidth, gridHeight),
      self: this.checkSelfCollision(snakeSegments),
      hasCollision: function () {
        return this.wall || this.self;
      },
    };
  }

  /**
   * Check if a position is occupied by the snake
   * @param {Object} position - Position to check
   * @param {Array} snakeSegments - Array of snake segments
   * @returns {boolean} True if position is occupied
   */
  static isPositionOccupied(position, snakeSegments) {
    return snakeSegments.some(segment =>
      this.positionsMatch(position, segment)
    );
  }

  /**
   * Get collision type as string for debugging
   * @param {Array} snakeSegments - Array of snake segments
   * @param {number} gridWidth - Grid width in cells
   * @param {number} gridHeight - Grid height in cells
   * @returns {string|null} Collision type or null if no collision
   */
  static getCollisionType(snakeSegments, gridWidth, gridHeight) {
    const collisions = this.checkAllCollisions(
      snakeSegments,
      gridWidth,
      gridHeight
    );

    if (collisions.wall) return 'wall';
    if (collisions.self) return 'self';
    return null;
  }
}
