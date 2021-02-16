import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGameLevel, toggle, start, gameLevel, gameOver, won } from '../actions';
import { setBoard, createBoard } from '../utils/setBoard';
import { revealNeighMineCount } from '../utils/revealNeighMineCount';
import Board from './Board';
import Title from './Title';
import GameLevel from './GameLevel';
import GameStatus from './GameStatus';

class App extends Component {
  constructor(props) {
    super(props);
    const { level } = this.props;
    this.state = {
      board: createBoard(level),
      seconds: 0,
      firstClick: true,
      minePositions: null,
    };

    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
    this.changeGameLevel = this.changeGameLevel.bind(this);
    this.handleClickCell = this.handleClickCell.bind(this);
    this.handleContextClickCell = this.handleContextClickCell.bind(this);
  }

  tick() {
    this.setState({
      seconds: this.state.seconds + 1,
    });
  }

  reset(e) {
    e.preventDefault();
    const { level } = this.props;
    this.props.dispatch(start());
    this.setState({
      board: createBoard(level),
      firstClick: true,
      seconds: 0
    });
    clearInterval(this.interval);
  }

  handleClickCell(x, y) {
    const { gameOver, won, level } = this.props;
    const { firstClick } = this.state;
    if (gameOver || won) {
      return;
    }
    if (firstClick) {
      const { board, minePositions } = setBoard(level, firstClick, x, y);
      board[x][y] = Object.assign({}, board[x][y], { reveal: true });
      this.setState({
        board,
        firstClick: false,
        minePositions
      });
      this.interval = setInterval(this.tick, 1000);
    } else {
      this.revealCell(x, y);
    }
  }

  handleContextClickCell(x, y) {
    const { gameOver, won } = this.props;
    const { board } = this.state;
    if (gameOver || won) {
      return;
    }
    if (!board[x][y].reveal) {
      this.toggleFlag(x, y);
    }
  }

  toggleFlag(x, y) {
    const board = this.state.board;
    const { flagged } = board[x][y];
    board[x][y] = Object.assign({}, board[x][y], { flagged: !flagged });
    this.setState({ board });
    this.props.dispatch(toggle(!flagged));
  }

  changeGameLevel(e) {
    const level = e.target.dataset.txt;
    this.props.dispatch(gameLevel(level));
    this.setState({
      board: createBoard(level),
      firstClick: true,
      seconds: 0
    });
    clearInterval(this.interval);
  }

  revealCell(x, y) {
    const board = this.state.board;
    let { level, dispatch } = this.props;
    const { boardWidth, boardHeight } = setGameLevel[level];

    if (!board[x][y].reveal) {
      let mineCount = revealNeighMineCount(board, boardWidth, boardHeight, x, y);
      board[x][y] = Object.assign({}, board[x][y], { reveal: true, mineCount: mineCount })
      this.setState({ board });

      if (mineCount === 0 && !board[x][y].mine) {
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if ((i < 0 || i >= boardWidth) || (j < 0 || j >= boardHeight) || (i === x && j === y) || (board[i][j].flagged)) {
              continue;
            }
            this.revealCell(i, j);
          }
        }
      }

      if (board[x][y].flagged) {
        this.toggleFlag(x, y);
      }

      if (board[x][y].mine) {
        dispatch(gameOver());
        this.state.minePositions.forEach(place => {
          board[place.x][place.y] = Object.assign({}, board[place.x][place.y], { reveal: true });
          this.setState({ board });
        });
        clearInterval(this.interval);
      }

      if (this.hasWon(board)) {
        dispatch(won());
        clearInterval(this.interval);
      }
    }
  }

  hasWon(board) {
    let revealCount = 0;
    const { level } = this.props;
    const { boardWidth, boardHeight, totalMines } = setGameLevel[level];

    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.reveal && (cell.mine === cell.flagged)) {
          revealCount++;
        }
      });
    });

    return revealCount === (boardWidth * boardHeight) - totalMines;
  }

  render() {
    const { board, seconds } = this.state;
    const { gameOver, won, mine } = this.props;

    return (
      <div className="container">
        <Title />
        <GameLevel
          changeGameLevel={this.changeGameLevel}
        />
        <GameStatus
          gameOver={gameOver}
          seconds={seconds}
          won={won}
          mine={mine}
          reset={this.reset}
        />
        <Board
          board={board}
          onClick={this.handleClickCell}
          onContextClick={this.handleContextClickCell}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => state.gameReducer;

export default connect(mapStateToProps)(App);
