export const GAME_CONFIG = {
  GRID_SIZE: 20, // Size of each grid cell in pixels
  CANVAS_SIZE: 600, // Base canvas size in pixels
  INITIAL_SNAKE_LENGTH: 3,
  GAME_SPEED: 150, // Game loop interval in milliseconds
};

// Game States
export const GAME_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
};

// Direction Constants
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

// Colors
export const COLORS = {
  SNAKE: '#4ade80',
  FOOD: '#ef4444',
  BACKGROUND: '#0f172a',
  GRID: '#1e293b',
};
