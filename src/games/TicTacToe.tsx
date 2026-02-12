import React, { useState } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      console.log(`[TicTacToe] Winner: ${newWinner}`);
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    console.log('[TicTacToe] Game reset');
  };

  const isBoardFull = board.every(cell => cell !== null);
  const status = winner
    ? `Winner: ${winner}!`
    : isBoardFull
    ? "It's a draw!"
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="tictactoe">
      <h2>Tic-Tac-Toe</h2>
      <div className="game-status">{status}</div>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};
