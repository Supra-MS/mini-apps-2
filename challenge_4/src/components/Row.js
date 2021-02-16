import React from 'react';
import Cell from './Cell';

const Row = ({ row, x, onClick, onContextClick }) => {
  return (
    <div>
      {row.map((cell, i) => {
        return (
          <Cell
            key={i}
            cell={cell}
            x={x}
            y={i}
            onClick={onClick}
            onContextClick={onContextClick}
          />
        )
      })}
    </div>
  );
};

export default Row;