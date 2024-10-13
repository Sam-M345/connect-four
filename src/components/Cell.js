// src/components/Cell.js
import React from 'react';
import './Cell.css';

const Cell = ({ value, row, col, handleClick }) => {
  const getColor = () => {
    if (value === 1) return 'red';
    if (value === 2) return 'yellow';
    return 'white';
  };

  return (
    <div
      className="cell"
      onClick={() => handleClick(col)}
      style={{ backgroundColor: getColor() }}
    ></div>
  );
};

export default Cell;

