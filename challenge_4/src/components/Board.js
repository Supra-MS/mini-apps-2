import React from 'react';
import Row from './Row';

const Board = ({ board, onClick, onContextClick }) => {
  return (
    <div className="board">
     {board.map((row, i) => {
       return (
        <Row
            key={i}
            row={row}
            x={i}
            onClick={onClick}
            onContextClick={onContextClick}
          />

       );
     })}
    </div>
  );
}

export default Board;