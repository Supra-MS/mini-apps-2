const setGameLevel = {
  beginner: {
    boardWidth: 8,
    boardHeight: 8,
    totalMines: 10
  },
  intermediate: {
    boardWidth: 16,
    boardHeight: 16,
    totalMines: 40
  },
  expert: {
    boardWidth: 30,
    boardHeight: 16,
    totalMines: 99
  }
};

const START = 'START';
const TOGGLE_FLAG = 'TOGGLE_FLAG';
const GAME_LEVEL = 'GAME_LEVEL';
const GAME_OVER = 'GAME_OVER';
const WON = 'WON';

const start = () => {
  return {
    type: START
  };
};

const toggle = (flagged) => {
  return {
    type: TOGGLE_FLAG,
    payload: {
      flagged
    },
  };
};

const gameLevel = (level) => {
  return {
    type: GAME_LEVEL,
    payload: {
      level
    },
  };
};

const gameOver = () => {
  return {
    type: GAME_OVER
  };
};

const won = () => {
  return {
    type: WON
  };
};

module.exports = { setGameLevel, START, TOGGLE_FLAG, GAME_LEVEL, GAME_OVER, WON, start, toggle, gameLevel, gameOver, won };