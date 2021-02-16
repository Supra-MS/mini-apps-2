export const revealNeighMineCount = (board, boardWidth, boardHeight, x, y) => {
  let mineCount = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if ((i < 0 || i >= boardWidth) || (j < 0 || j >= boardHeight) || (i === x && j === y)) {
        continue;
      }
      if (board[i][j].mine) {
        mineCount++;
      }
    }
  }
  return mineCount;
};