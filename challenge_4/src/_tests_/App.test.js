import { render, screen, fireEvent } from '@testing-library/react';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import gameReducer from '../reducers/gameReducer';
import App from '../components/App';
import GameStatus from '../components/GameStatus';
import { plantMines } from '../utils/setBoard';
import * as actions from '../actions';
import { winBoard } from './data';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });
const store = createStore(reducers, applyMiddleware());
const wrapper = shallow(<App store={store} />);
const instance = wrapper.dive().instance();
let interState, clickBoard, clickMinePositions;

beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
});

describe('Minesweeper Game Tests:', () => {
  test('Check title', () => {
    const title = screen.getByText(/minesweeper/i);
    expect(title).toBeInTheDocument();
  });

  test('Check the total count for planting mines based on the game level', () => {
    const beginnerCount = plantMines('beginner');
    const intermediateCount = plantMines('intermediate');
    const expertCount = plantMines('expert');

    expect(beginnerCount.length).toBe(10);
    expect(intermediateCount.length).toBe(40);
    expect(expertCount.length).toBe(99);
  });

  test('Check that the First click should not be a mine', () => {
    jest.spyOn(instance, 'handleClickCell');
    expect(instance.state.firstClick).toBe(true);
    expect(instance.state.minePositions).toBeFalsy();
    expect(instance.interval).toBeFalsy();

    instance.handleClickCell(3,1);
    clickBoard = instance.state.board;
    clickMinePositions = instance.state.minePositions;

    expect(instance.state.firstClick).toBe(false);
    expect(clickMinePositions).toBeTruthy();
    expect(instance.interval).toBeTruthy();
    expect(clickBoard[3][1].mine).toBe(false);
  });

  test('Check that on clicking mine dispatches game over()', () => {
    let x = clickMinePositions[0].x;
    let y = clickMinePositions[0].y;

    jest.spyOn(instance, 'revealCell');
    expect(clickBoard[x][y].mine).toBe(true);
    expect(clickBoard[x][y].reveal).toBe(false);
    expect(clickBoard[x][y].flagged).toBe(false);

    instance.revealCell(x, y);
    expect(clickBoard[x][y].mine).toBe(true);
    expect(clickBoard[x][y].reveal).toBe(true);
    expect(clickBoard[x][y].flagged).toBe(false);
    expect(screen.getByText(/😣/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('😣'));
  });

  test('Check the mine count through toggling flag and reset methods', () => {
    expect(wrapper.exists()).toBe(true);

    jest.spyOn(instance, 'toggleFlag');
    instance.toggleFlag(1, 2);
    expect(instance.toggleFlag).toHaveBeenCalledTimes(1);
    instance.toggleFlag(1, 3);
    expect(instance.toggleFlag).toHaveBeenCalledTimes(2);
    expect(instance.props.store.getState().gameReducer.mine).toBe(8);

    // Clicking same cell
    instance.toggleFlag(0, 3);
    expect(instance.toggleFlag).toHaveBeenCalledTimes(3);
    expect(instance.props.store.getState().gameReducer.mine).toBe(7);
    instance.toggleFlag(0, 3);
    expect(instance.toggleFlag).toHaveBeenCalledTimes(4);
    expect(instance.props.store.getState().gameReducer.mine).toBe(8);

    // After reset
    fireEvent.click(screen.getByText('🙂'));
    expect(instance.props.store.getState().gameReducer.mine).toBe(10);
    expect(instance.props.store.getState().gameReducer.level).toEqual('beginner');
    expect(instance.props.store.getState().gameReducer.gameOver).toBe(false);
    expect(instance.props.store.getState().gameReducer.won).toBe(false);
  });


  test('Check the action and reducer for initial start', () => {
    const prevState = { level: "intermediate", mine: 0, gameOver: true, won: true, };
    const actionStart = { type: 'START', };

    const newState = gameReducer(prevState, actionStart);
    expect(newState.level).toEqual('intermediate');
    expect(newState.mine).toEqual(40);
    expect(newState.gameOver).toBe(false);
  });

  test('Check the state of different game levels through reducer and events', () => {
    const prevState = { level: "expert", mine: 0, gameOver: true, won: true, };
    const actionLevel = { type: 'GAME_LEVEL', payload: { level: 'beginner' } };

    const newState = gameReducer(prevState, actionLevel);
    expect(newState.level).toEqual('beginner');
    expect(newState.mine).toEqual(10);
    expect(newState.gameOver).toBe(false);
    fireEvent.click(screen.getByText(/beginner/i));
    expect(instance.props.store.getState().gameReducer.level).toEqual('beginner');
    fireEvent.click(screen.getByText(/expert/i));
    expect(instance.props.store.getState().gameReducer.level).toEqual('expert');
    fireEvent.click(screen.getByText(/intermediate/i));
    interState = instance.props.store.getState().gameReducer;
    expect(instance.props.store.getState().gameReducer.level).toEqual('intermediate');
    expect(instance.props.store.getState().gameReducer.gameOver).toBe(false);
  });

  test('Check the winner status by changing the state and passing through dispatch()', () => {
    jest.spyOn(instance, 'hasWon');
    expect(instance.hasWon(winBoard)).toBe(true);

    const newState = gameReducer(interState, instance.props.store.dispatch(actions.won()));
    expect(newState.level).toEqual('intermediate');
    expect(newState.gameOver).toBe(false);
    expect(newState.won).toBe(true);

    let props = { gameOver: false, won: true, };

    let gameWrapper = renderer.create(<GameStatus {...props} />).toJSON();
    expect(gameWrapper).toMatchSnapshot();
    expect(gameWrapper.children[1].props).toEqual({"className": "win-status won false"});
    expect(gameWrapper.children[1].children[0]).toEqual('🥳 CONGRATS! YOU WON 🥳');
    expect(screen.getByText(/😎/i)).toBeInTheDocument();

    props = { gameOver: true, won: false };

    gameWrapper = renderer.create(<GameStatus {...props} />).toJSON();
    expect(gameWrapper.children[1].props).toEqual({"className": "win-status false lose"});
    expect(gameWrapper.children[1].children[0]).toEqual('!! TRY AGAIN !!');
  });

});