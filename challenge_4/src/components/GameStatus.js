import React from 'react';

const GameStatus =({ gameOver, seconds, won, mine, reset}) => {
  return (
    <div className="container">
      <div className="game-status">
        <button className="time-counter">⏱ {!gameOver ? `${seconds}` : `${seconds}`} </button>
        <button onClick={reset} className="reset"> {gameOver ? '😣' : won ? '😎' : '🙂'} </button>
        <button className="mine-counter">💣 {mine} </button>
      </div>
      <div className={`win-status ${won && 'won'} ${gameOver && 'lose'}`}>
        {won ? '🥳 CONGRATS! YOU WON 🥳' : gameOver ? '!! TRY AGAIN !!' : null}
      </div>
    </div>
  );
};

export default GameStatus;