// src/components/Board.js
import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            row={rowIndex}
            col={colIndex}
            handleClick={handleClick}
          />
        ))
      )}
    </div>
  );
};

export default Board;
