// src/App.js
import React, { useState, useRef } from 'react';
import './App.css';
import winnerImage from './winner.jpg';

// Define the constants
const ROWS = 6;
const COLUMNS = 7;

// Function to check for a win
const checkWin = (board, player) => {
  // Check horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (
        board[r][c] === player &&
        board[r][c + 1] === player &&
        board[r][c + 2] === player &&
        board[r][c + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check vertical
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c] === player &&
        board[r + 2][c] === player &&
        board[r + 3][c] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonal (down-right)
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonal (down-left)
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 3; c < COLUMNS; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c - 1] === player &&
        board[r + 2][c - 2] === player &&
        board[r + 3][c - 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};

function App() {
  // Initialize the board with ROWS and COLUMNS
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('R');
  const [winner, setWinner] = useState(null);
  const [hoverColumn, setHoverColumn] = useState(null);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const boardRef = useRef(null);
  const [showWinnerImage, setShowWinnerImage] = useState(false);

  const handleClick = (col) => {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWin(newBoard, currentPlayer)) {
          setWinner(currentPlayer);
          setShowWinnerImage(true); // Add this line
        } else {
          setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
        }
        return; // Exit after placing the disk
      }
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null)));
    setCurrentPlayer('R');
    setWinner(null);
  };

  const handleMouseMove = (e) => {
    updateHandPosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      updateHandPosition(e.touches[0].clientX);
    }
  };

  const updateHandPosition = (clientX) => {
    const board = boardRef.current.getBoundingClientRect();
    const columnWidth = board.width / 7;
    const column = Math.min(Math.max(Math.floor((clientX - board.left) / columnWidth), 0), 6);
    setHandPosition({ 
      x: column * columnWidth,
    });
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="current-player">
          Current Player
        </div>
        <div className={`player-indicator ${currentPlayer.toLowerCase()}`}></div>
      </div>
      <div className="board-container" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
        <div className="board" ref={boardRef}>
          {Array.from({ length: COLUMNS }, (_, colIndex) => (
            <div
              key={colIndex}
              className="column"
              onClick={() => handleClick(colIndex)}
              onMouseEnter={() => setHoverColumn(colIndex)}
              onMouseLeave={() => setHoverColumn(null)}
            >
              {Array.from({ length: ROWS }, (_, rowIndex) => {
                const reversedRowIndex = ROWS - 1 - rowIndex; // Reverse the row index
                return (
                  <div
                    key={`${colIndex}-${reversedRowIndex}`}
                    className={`cell ${
                      hoverColumn === colIndex && !board[reversedRowIndex][colIndex]
                        ? 'hover'
                        : ''
                    }`}
                  >
                    {board[reversedRowIndex][colIndex] && (
                      <div className={`piece ${board[reversedRowIndex][colIndex].toLowerCase()}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div 
          className="hand-icon" 
          style={{
            transform: `translateX(${handPosition.x}px)`,
          }}
        />
      </div>
      <div className="side-info">
        <h1 className="game-title">Connect Four</h1>
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>
      {winner && (
        <div className="winner">
          <div>Player {winner === 'R' ? 'Red' : 'Blue'} wins!</div>
          <img src={process.env.PUBLIC_URL + '/winner.jpg'} alt="Winner Image" />
        </div>
      )}
    </div>
  );
}

export default App;
