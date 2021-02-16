import { setGameLevel, START, TOGGLE_FLAG, GAME_LEVEL, GAME_OVER, WON} from '../actions';

const setInitialState = {
  level: 'beginner',
  mine: setGameLevel['beginner'].totalMines,
  gameOver: false,
  won: false,
};

const gameReducer = (state = setInitialState, action) => {
  switch(action.type) {
    case START: {
      return {
        gameOver: false,
        won: false,
        mine: setGameLevel[state.level].totalMines,
        level: state.level
      };
    }
    case TOGGLE_FLAG: {
      const { flagged } = action.payload;
      let { mine } = state;
      flagged ? mine -= 1 : mine += 1;
      return Object.assign({}, state, { mine });
    }
    case GAME_LEVEL: {
      const { level } = action.payload;
      return {
        gameOver: false,
        won: false,
        mine: setGameLevel[level].totalMines,
        level
      };
    }
    case GAME_OVER: {
      return Object.assign({}, state, { gameOver: true });
    }
    case WON: {
      return Object.assign({}, state, { won: true });
    }
    default: return state;
  }
};

export default gameReducer;
