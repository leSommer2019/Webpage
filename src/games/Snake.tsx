import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Snake.css';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    console.log('[Snake] Game reset');
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const currentDirection = directionRef.current;
      let newHead: Position;

      switch (currentDirection) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        console.log('[Snake] Game over - wall collision');
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsPlaying(false);
        console.log('[Snake] Game over - self collision');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        console.log('[Snake] Food eaten, score:', score + 10);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [gameOver, isPlaying, food, generateFood, score]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const intervalId = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(intervalId);
  }, [isPlaying, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      const currentDirection = directionRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
          if (currentDirection !== 'DOWN') setDirection('UP');
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (currentDirection !== 'UP') setDirection('DOWN');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (currentDirection !== 'RIGHT') setDirection('LEFT');
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (currentDirection !== 'LEFT') setDirection('RIGHT');
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver]);

  return (
    <div className="snake-game">
      <h2>Snake Game</h2>
      <div className="game-info">
        <div className="score">Score: {score}</div>
        {gameOver && <div className="game-over">Game Over!</div>}
      </div>
      <div 
        className="snake-grid"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            className={`snake-segment ${index === 0 ? 'head' : ''}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      </div>
      <div className="controls">
        {!isPlaying && (
          <button className="control-button" onClick={resetGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        )}
        {isPlaying && !gameOver && (
          <div className="instructions">Use arrow keys to move</div>
        )}
      </div>
    </div>
  );
};
