import { DIRECTIONS } from '../config/gameConfig.js';

/**
 * Input handler class for managing keyboard and touch controls
 */
export class InputHandler {
  constructor() {
    this.keyMap = {
      ArrowUp: DIRECTIONS.UP,
      ArrowDown: DIRECTIONS.DOWN,
      ArrowLeft: DIRECTIONS.LEFT,
      ArrowRight: DIRECTIONS.RIGHT,
      KeyW: DIRECTIONS.UP,
      KeyS: DIRECTIONS.DOWN,
      KeyA: DIRECTIONS.LEFT,
      KeyD: DIRECTIONS.RIGHT,
    };

    this.onDirectionChange = null;
    this.onGameAction = null;
    this.setupEventListeners();
  }

  /**
   * Set callback for direction changes
   * @param {Function} callback - Function to call when direction changes
   */
  setDirectionChangeCallback(callback) {
    this.onDirectionChange = callback;
  }

  /**
   * Set callback for game actions (pause, start, etc.)
   * @param {Function} callback - Function to call for game actions
   */
  setGameActionCallback(callback) {
    this.onGameAction = callback;
  }

  /**
   * Setup keyboard event listeners
   */
  setupEventListeners() {
    document.addEventListener('keydown', event => {
      this.handleKeyPress(event);
    });

    // Setup mobile touch controls
    this.setupMobileControls();
  }

  /**
   * Handle keyboard input
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyPress(event) {
    const direction = this.keyMap[event.code];

    if (direction && this.onDirectionChange) {
      event.preventDefault();
      this.onDirectionChange(direction);
      return;
    }

    // Handle game control keys
    switch (event.code) {
      case 'Space':
        event.preventDefault();
        if (this.onGameAction) {
          this.onGameAction('toggle_pause');
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (this.onGameAction) {
          this.onGameAction('start_game');
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (this.onGameAction) {
          this.onGameAction('reset_game');
        }
        break;
    }
  }

  /**
   * Setup mobile touch controls
   */
  setupMobileControls() {
    const mobileControls = {
      'up-btn': DIRECTIONS.UP,
      'down-btn': DIRECTIONS.DOWN,
      'left-btn': DIRECTIONS.LEFT,
      'right-btn': DIRECTIONS.RIGHT,
    };

    Object.entries(mobileControls).forEach(([buttonId, direction]) => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener('click', () => {
          if (this.onDirectionChange) {
            this.onDirectionChange(direction);
          }
        });

        // Add touch events for better mobile experience
        button.addEventListener('touchstart', event => {
          event.preventDefault();
          if (this.onDirectionChange) {
            this.onDirectionChange(direction);
          }
        });
      }
    });
  }

  /**
   * Enable or disable input handling
   * @param {boolean} enabled - Whether input should be enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  /**
   * Clean up event listeners
   */
  destroy() {}
}
