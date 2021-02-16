import { setGameLevel } from '../actions';

export const createBoard = (level) => {
  const { boardWidth, boardHeight } = setGameLevel[level];
  const board = Array.from(new Array(boardWidth),
    () => new Array(boardHeight).fill(
      {
        mine: false,
        mineCount: 0,
        reveal: false,
        flagged: false
      }
    )
  );
  return board;
};

const generateRandom = (duplicate, widthOrHeight) => {
  let randomWidth = Math.floor(Math.random() * widthOrHeight);
  return (randomWidth === duplicate) ? generateRandom(duplicate, widthOrHeight) : randomWidth;
};

export const plantMines = (level, firstClick, xFirst, yFirst) => {
  const minePositions = [];
  const { boardWidth, boardHeight, totalMines } = setGameLevel[level];

  while (minePositions.length < totalMines) {
    let x = generateRandom(xFirst, boardWidth);
    let y = generateRandom(yFirst, boardHeight);

    if (minePositions.length) {
      const duplicateMines = minePositions.filter((position) => {
        return (position.x === x && position.y === y);
      });

      let getIndexOfDuplicatedMine = (position) => (position.x === x && position.y === y);
      const isDuplicated = duplicateMines.length > 0;

      if (isDuplicated) {
        minePositions.splice(minePositions.findIndex(getIndexOfDuplicatedMine), 1);
      }

      if (!isDuplicated || firstClick) {
        minePositions.push({ x, y });
      }

    } else {
      minePositions.push({ x, y });
    }

  }
  console.log('Mine Positions: ', minePositions);
  return minePositions;
};

export const setBoard = (level, firstClick, x, y) => {
  const minePositions = plantMines(level, firstClick, x, y)
  const board = createBoard(level);

  for (let position of minePositions) {
    board[position.x][position.y] = Object.assign({}, board[position.x][position.y], { mine: true })
  }
  console.log('Board 😇 ☎ 🇨🇦', board)
  return { board, minePositions };
};