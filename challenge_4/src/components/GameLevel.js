import React from 'react';

const GameLevel = ({ changeGameLevel }) => {
  return (
    <div className="game-level">
      <button data-txt="beginner" onClick={(e) => changeGameLevel(e)}>Beginner</button>
      <button data-txt="intermediate" onClick={(e) => changeGameLevel(e)}>Intermediate</button>
      <button data-txt="expert" onClick={(e) => changeGameLevel(e)}>Expert</button>
    </div>
  );

};

export default GameLevel;