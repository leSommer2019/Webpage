import React, { useState, useEffect } from 'react';
import './Battleship.css';

type Cell = 'empty' | 'ship' | 'hit' | 'miss';
type GamePhase = 'placement' | 'playing' | 'gameOver';

interface Ship {
  name: string;
  size: number;
  placed: boolean;
}

const GRID_SIZE = 10;
const SHIPS: Ship[] = [
  { name: 'Carrier', size: 5, placed: false },
  { name: 'Battleship', size: 4, placed: false },
  { name: 'Cruiser', size: 3, placed: false },
  { name: 'Submarine', size: 3, placed: false },
  { name: 'Destroyer', size: 2, placed: false },
];

export const Battleship: React.FC = () => {
  const [playerGrid, setPlayerGrid] = useState<Cell[][]>([]);
  const [computerGrid, setComputerGrid] = useState<Cell[][]>([]);
  const [revealedGrid, setRevealedGrid] = useState<Cell[][]>([]);
  const [phase, setPhase] = useState<GamePhase>('placement');
  const [ships, setShips] = useState<Ship[]>(SHIPS);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [playerHits, setPlayerHits] = useState(0);
  const [computerHits, setComputerHits] = useState(0);
  const [message, setMessage] = useState('Place your Carrier (5 cells)');
  const [winner, setWinner] = useState<string | null>(null);

  const totalShipCells = SHIPS.reduce((sum, ship) => sum + ship.size, 0);

  useEffect(() => {
    initializeGrids();
  }, []);

  const initializeGrids = () => {
    const emptyGrid = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill('empty' as Cell)
    );
    setPlayerGrid(JSON.parse(JSON.stringify(emptyGrid)));
    setComputerGrid(JSON.parse(JSON.stringify(emptyGrid)));
    setRevealedGrid(JSON.parse(JSON.stringify(emptyGrid)));
    console.log('[Battleship] Grids initialized');
  };

  const canPlaceShip = (grid: Cell[][], row: number, col: number, size: number, horizontal: boolean): boolean => {
    if (horizontal) {
      if (col + size > GRID_SIZE) return false;
      for (let i = 0; i < size; i++) {
        if (grid[row][col + i] === 'ship') return false;
      }
    } else {
      if (row + size > GRID_SIZE) return false;
      for (let i = 0; i < size; i++) {
        if (grid[row + i][col] === 'ship') return false;
      }
    }
    return true;
  };

  const placeShip = (grid: Cell[][], row: number, col: number, size: number, horizontal: boolean): Cell[][] => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (horizontal) {
      for (let i = 0; i < size; i++) {
        newGrid[row][col + i] = 'ship';
      }
    } else {
      for (let i = 0; i < size; i++) {
        newGrid[row + i][col] = 'ship';
      }
    }
    return newGrid;
  };

  const handlePlayerPlacement = (row: number, col: number) => {
    if (phase !== 'placement' || currentShipIndex >= ships.length) return;

    const currentShip = ships[currentShipIndex];
    if (!canPlaceShip(playerGrid, row, col, currentShip.size, isHorizontal)) {
      setMessage('Cannot place ship here!');
      return;
    }

    const newGrid = placeShip(playerGrid, row, col, currentShip.size, isHorizontal);
    setPlayerGrid(newGrid);

    const newShips = [...ships];
    newShips[currentShipIndex].placed = true;
    setShips(newShips);

    const nextIndex = currentShipIndex + 1;
    setCurrentShipIndex(nextIndex);

    if (nextIndex >= ships.length) {
      placeComputerShips();
      setPhase('playing');
      setMessage('All ships placed! Attack the enemy grid!');
      console.log('[Battleship] All ships placed, game starting');
    } else {
      setMessage(`Place your ${ships[nextIndex].name} (${ships[nextIndex].size} cells)`);
    }
  };

  const placeComputerShips = () => {
    let grid = JSON.parse(JSON.stringify(computerGrid));
    
    for (const ship of SHIPS) {
      let placed = false;
      while (!placed) {
        const horizontal = Math.random() > 0.5;
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        
        if (canPlaceShip(grid, row, col, ship.size, horizontal)) {
          grid = placeShip(grid, row, col, ship.size, horizontal);
          placed = true;
        }
      }
    }
    
    setComputerGrid(grid);
    console.log('[Battleship] Computer ships placed');
  };

  const handlePlayerAttack = (row: number, col: number) => {
    if (phase !== 'playing' || revealedGrid[row][col] !== 'empty') return;

    const newRevealed = [...revealedGrid];
    const isHit = computerGrid[row][col] === 'ship';
    
    newRevealed[row][col] = isHit ? 'hit' : 'miss';
    setRevealedGrid(newRevealed);

    if (isHit) {
      const newHits = playerHits + 1;
      setPlayerHits(newHits);
      setMessage('Hit! 💥');
      console.log(`[Battleship] Player hit at ${row},${col}`);
      
      if (newHits === totalShipCells) {
        setWinner('Player');
        setPhase('gameOver');
        setMessage('You won! All enemy ships destroyed! 🎉');
        return;
      }
    } else {
      setMessage('Miss! 💧');
      console.log(`[Battleship] Player missed at ${row},${col}`);
    }

    // Computer's turn
    setTimeout(() => computerAttack(), 500);
  };

  const computerAttack = () => {
    let row, col;
    do {
      row = Math.floor(Math.random() * GRID_SIZE);
      col = Math.floor(Math.random() * GRID_SIZE);
    } while (playerGrid[row][col] === 'hit' || playerGrid[row][col] === 'miss');

    const newGrid = [...playerGrid];
    const isHit = playerGrid[row][col] === 'ship';
    
    newGrid[row][col] = isHit ? 'hit' : 'miss';
    setPlayerGrid(newGrid);

    if (isHit) {
      const newHits = computerHits + 1;
      setComputerHits(newHits);
      setMessage('Computer hit your ship! 💥');
      console.log(`[Battleship] Computer hit at ${row},${col}`);
      
      if (newHits === totalShipCells) {
        setWinner('Computer');
        setPhase('gameOver');
        setMessage('Computer won! All your ships destroyed! 😢');
        return;
      }
    } else {
      setMessage('Computer missed! 💧');
      console.log(`[Battleship] Computer missed at ${row},${col}`);
    }
  };

  const resetGame = () => {
    initializeGrids();
    setShips(SHIPS.map(s => ({ ...s, placed: false })));
    setCurrentShipIndex(0);
    setPhase('placement');
    setIsHorizontal(true);
    setPlayerHits(0);
    setComputerHits(0);
    setMessage('Place your Carrier (5 cells)');
    setWinner(null);
    console.log('[Battleship] Game reset');
  };

  const renderCell = (cell: Cell, isPlayer: boolean, row: number, col: number) => {
    let className = 'cell';
    let content = '';

    if (isPlayer) {
      if (cell === 'ship') {
        className += ' ship';
        content = '🚢';
      } else if (cell === 'hit') {
        className += ' hit';
        content = '💥';
      } else if (cell === 'miss') {
        className += ' miss';
        content = '💧';
      }
    } else {
      if (cell === 'hit') {
        className += ' hit';
        content = '💥';
      } else if (cell === 'miss') {
        className += ' miss';
        content = '💧';
      }
    }

    return (
      <button
        key={`${row}-${col}`}
        className={className}
        onClick={() => isPlayer ? handlePlayerPlacement(row, col) : handlePlayerAttack(row, col)}
        disabled={isPlayer ? phase !== 'placement' : phase !== 'playing'}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="battleship-game">
      <h2>Battleship</h2>
      
      <div className="game-status">
        <div className="status-message">{message}</div>
        {phase === 'placement' && (
          <button className="rotate-button" onClick={() => setIsHorizontal(!isHorizontal)}>
            Orientation: {isHorizontal ? 'Horizontal →' : 'Vertical ↓'}
          </button>
        )}
      </div>

      <div className="scores">
        <div className="score-item">Your Hits: {playerHits}/{totalShipCells}</div>
        <div className="score-item">Computer Hits: {computerHits}/{totalShipCells}</div>
      </div>

      <div className="grids-container">
        <div className="grid-section">
          <h3>Your Fleet</h3>
          <div className="grid">
            {playerGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => renderCell(cell, true, rowIndex, colIndex))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid-section">
          <h3>Enemy Waters</h3>
          <div className="grid">
            {revealedGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => renderCell(cell, false, rowIndex, colIndex))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {phase === 'gameOver' && (
        <div className="game-over">
          <h3>{winner} Won!</h3>
          <button className="reset-button" onClick={resetGame}>
            New Game
          </button>
        </div>
      )}

      {phase === 'placement' && (
        <div className="ship-list">
          <h4>Ships to Place:</h4>
          {ships.map((ship, index) => (
            <div
              key={ship.name}
              className={`ship-item ${ship.placed ? 'placed' : ''} ${index === currentShipIndex ? 'current' : ''}`}
            >
              {ship.name} ({ship.size})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
