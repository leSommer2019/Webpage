import React from 'react';
import { t } from '../utils/translations';
import type { Language } from '../types';
import './Games.css';

interface GamesProps {
  language: Language;
  onSelectGame: (game: string) => void;
}

export const Games: React.FC<GamesProps> = ({ language, onSelectGame }) => {
  const games = [
    { id: 'tictactoe', name: t('ticTacToe', language), icon: '⭕' },
    { id: 'snake', name: t('snake', language), icon: '🐍' },
    { id: 'memory', name: t('memory', language), icon: '🎴' },
    { id: 'rps', name: t('rockPaperScissors', language), icon: '✊' },
    { id: 'yahtzee', name: t('yahtzee', language), icon: '🎲' },
    { id: 'battleship', name: t('battleship', language), icon: '⚓' },
  ];

  return (
    <div className="games">
      <h1>{t('browserGames', language)}</h1>
      <div className="games-grid">
        {games.map((game) => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => onSelectGame(game.id)}
          >
            <span className="game-icon">{game.icon}</span>
            <h3>{game.name}</h3>
            <span className="play-btn">{t('playNow', language)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
