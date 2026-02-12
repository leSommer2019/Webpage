import React, { useState, useEffect } from 'react';
import './Memory.css';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];

export const Memory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = () => {
    const cardPairs = [...EMOJIS, ...EMOJIS];
    const shuffled = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
    console.log('[Memory] Game initialized');
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.value === secondCard.value) {
        // Match found
        console.log('[Memory] Match found!');
        setCards(prev =>
          prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsWon(true);
      console.log(`[Memory] Game won in ${moves} moves!`);
    }
  }, [cards, moves]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    setCards(prev =>
      prev.map(card => (card.id === id ? { ...card, isFlipped: true } : card))
    );
    setFlippedCards(prev => [...prev, id]);
  };

  return (
    <div className="memory-game">
      <h2>Memory Game</h2>
      <div className="game-stats">
        <div className="stat">Moves: {moves}</div>
        {isWon && <div className="won-message">🎉 You Won! 🎉</div>}
      </div>
      <div className="memory-grid">
        {cards.map(card => (
          <button
            key={card.id}
            className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
              card.isMatched ? 'matched' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={initializeGame}>
        New Game
      </button>
    </div>
  );
};
