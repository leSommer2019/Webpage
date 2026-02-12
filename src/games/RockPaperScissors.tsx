import React, { useState } from 'react';
import './RockPaperScissors.css';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const choices: Choice[] = ['rock', 'paper', 'scissors'];
const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

export const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const handleChoice = (choice: Choice) => {
    const computerPick = choices[Math.floor(Math.random() * choices.length)] as Choice;
    setPlayerChoice(choice);
    setComputerChoice(computerPick);

    const winner = determineWinner(choice, computerPick);
    
    if (winner === 'player') {
      setResult('You Win! 🎉');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      console.log('[RPS] Player wins!');
    } else if (winner === 'computer') {
      setResult('Computer Wins! 😢');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      console.log('[RPS] Computer wins!');
    } else {
      setResult("It's a Draw! 🤝");
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
      console.log('[RPS] Draw!');
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0, draws: 0 });
    console.log('[RPS] Game reset');
  };

  return (
    <div className="rps-game">
      <h2>Rock Paper Scissors</h2>
      
      <div className="score-board">
        <div className="score-item">
          <div className="score-label">You</div>
          <div className="score-value">{score.player}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Draws</div>
          <div className="score-value">{score.draws}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Computer</div>
          <div className="score-value">{score.computer}</div>
        </div>
      </div>

      <div className="choices-display">
        <div className="choice-box">
          <div className="choice-label">You</div>
          <div className="choice-emoji">
            {playerChoice ? emojis[playerChoice] : '❓'}
          </div>
        </div>
        <div className="vs">VS</div>
        <div className="choice-box">
          <div className="choice-label">Computer</div>
          <div className="choice-emoji">
            {computerChoice ? emojis[computerChoice] : '❓'}
          </div>
        </div>
      </div>

      {result && <div className="result-message">{result}</div>}

      <div className="choice-buttons">
        {choices.map(choice => (
          <button
            key={choice}
            className="choice-button"
            onClick={() => handleChoice(choice)}
          >
            <span className="choice-icon">{choice && emojis[choice]}</span>
            <span className="choice-name">{choice}</span>
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Score
      </button>
    </div>
  );
};
