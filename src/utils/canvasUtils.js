import { GAME_CONFIG, COLORS } from '../config/gameConfig.js';

/**
 * Initialize canvas with proper dimensions and context
 * @returns {Object} Object containing canvas and context
 */
export function initializeCanvas() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = GAME_CONFIG.CANVAS_SIZE;
  canvas.height = GAME_CONFIG.CANVAS_SIZE;

  // Draw initial grid for development
  drawGrid(ctx);

  return { canvas, ctx };
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
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
export function clearCanvas(ctx, width, height) {
  ctx.fillStyle = COLORS.BACKGROUND;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draw a rectangle on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} x - X coordinate in pixels
 * @param {number} y - Y coordinate in pixels
 * @param {number} width - Width in pixels
 * @param {number} height - Height in pixels
 * @param {string} color - Fill color
 */
export function drawRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
