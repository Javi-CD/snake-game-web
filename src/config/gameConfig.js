export const GAME_CONFIG = {
  GRID_SIZE: 20, // Size of each grid cell in pixels
  CANVAS_SIZE: 600, // Base canvas size in pixels
  INITIAL_SNAKE_LENGTH: 3,
  GAME_SPEED: 150, // Game loop interval in milliseconds
  POINTS_PER_FOOD: 10, // Points awarded for eating food
  SPEED_INCREASE_FACTOR: 0.95, // Speed increase factor (lower = faster)
  MAX_SPEED: 50, // Maximum game speed (minimum interval)
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
  SNAKE_HEAD: '#4ade80',
  SNAKE_BODY: '#22c55e',
  FOOD: '#ef4444',
  BACKGROUND: '#0f172a',
  GRID: '#1e293b',
};
