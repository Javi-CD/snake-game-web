import { GAME_CONFIG, COLORS } from '../config/gameConfig.js';

/**
 * Initialize canvas with proper dimensions and context
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @returns {CanvasRenderingContext2D} The 2D rendering context
 */
export function initializeCanvas(canvas) {
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = GAME_CONFIG.CANVAS_SIZE;
  canvas.height = GAME_CONFIG.CANVAS_SIZE;

  // Draw initial grid for development
  drawGrid(ctx);

  return ctx;
}

/**
 * Draw grid lines for development purposes
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 */
export function drawGrid(ctx) {
  ctx.strokeStyle = COLORS.GRID;
  ctx.lineWidth = 1;

  // Draw vertical lines
  for (let x = 0; x <= GAME_CONFIG.CANVAS_SIZE; x += GAME_CONFIG.GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_CONFIG.CANVAS_SIZE);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= GAME_CONFIG.CANVAS_SIZE; y += GAME_CONFIG.GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(GAME_CONFIG.CANVAS_SIZE, y);
    ctx.stroke();
  }
}

/**
 * Clear the entire canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 */
export function clearCanvas(ctx) {
  ctx.fillStyle = COLORS.BACKGROUND;
  ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_SIZE, GAME_CONFIG.CANVAS_SIZE);
}

/**
 * Draw a rectangle on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} x - X coordinate in grid units
 * @param {number} y - Y coordinate in grid units
 * @param {string} color - Fill color
 */
export function drawRect(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    x * GAME_CONFIG.GRID_SIZE,
    y * GAME_CONFIG.GRID_SIZE,
    GAME_CONFIG.GRID_SIZE,
    GAME_CONFIG.GRID_SIZE
  );
}
