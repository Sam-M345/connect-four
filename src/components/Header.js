// src/components/Header.js
import React from 'react';

const Header = ({ currentPlayer, resetGame }) => {
  return (
    <div className="header">
      <h1>Connect Four</h1>
      <p>Current Player: {currentPlayer === 1 ? 'Red' : 'Yellow'}</p>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Header;
