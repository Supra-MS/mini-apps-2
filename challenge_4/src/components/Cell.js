import React from 'react';
import { applyStyleForMineCount } from '../utils/applyStyleForMineCount';

const Cell = ({ onClick, onContextClick, x, y, cell }) => {
  let content = cell.flagged ? '🚩' : '';
  let style;

  if (cell.reveal) {
    if (cell.mine) {
      content = '💣';
      style = applyStyleForMineCount(content, style);
    } else {
      if (cell.mineCount > 0) {
        content = cell.mineCount;
        style = applyStyleForMineCount(content, style);
      } else {
        content = ''
      }
    }
  }

  return (
    <div className={`cell ${cell.reveal ? 'reveal' : 'base'}`} style={style}
      onClick={(e) => {
        e.preventDefault();
        onClick(x, y)
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextClick(x, y)
      }}>
      {content}
    </div>
  );
};

export default Cell;
