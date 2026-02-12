import React, { useState } from 'react';
import './Yahtzee.css';

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

interface ScoreCard {
  ones: number | null;
  twos: number | null;
  threes: number | null;
  fours: number | null;
  fives: number | null;
  sixes: number | null;
  threeOfKind: number | null;
  fourOfKind: number | null;
  fullHouse: number | null;
  smallStraight: number | null;
  largeStraight: number | null;
  yahtzee: number | null;
  chance: number | null;
}

const DICE_EMOJIS: Record<DiceValue, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

export const Yahtzee: React.FC = () => {
  const [dice, setDice] = useState<DiceValue[]>([1, 1, 1, 1, 1]);
  const [held, setHeld] = useState<boolean[]>([false, false, false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scoreCard, setScoreCard] = useState<ScoreCard>({
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfKind: null,
    fourOfKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null,
  });
  const [gameOver, setGameOver] = useState(false);

  const rollDice = () => {
    if (rollsLeft === 0) return;

    const newDice = dice.map((die, i) =>
      held[i] ? die : (Math.floor(Math.random() * 6) + 1 as DiceValue)
    );
    setDice(newDice);
    setRollsLeft(rollsLeft - 1);
    console.log('[Yahtzee] Rolled dice:', newDice);
  };

  const toggleHold = (index: number) => {
    if (rollsLeft === 3) return; // Can't hold before first roll
    const newHeld = [...held];
    newHeld[index] = !newHeld[index];
    setHeld(newHeld);
  };

  const countDice = (value: DiceValue): number => {
    return dice.filter(d => d === value).length;
  };

  const calculateScore = (category: keyof ScoreCard): number => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    dice.forEach(d => counts[d]++);
    const sorted = [...dice].sort();

    switch (category) {
      case 'ones': return countDice(1) * 1;
      case 'twos': return countDice(2) * 2;
      case 'threes': return countDice(3) * 3;
      case 'fours': return countDice(4) * 4;
      case 'fives': return countDice(5) * 5;
      case 'sixes': return countDice(6) * 6;
      case 'threeOfKind':
        return counts.some(c => c >= 3) ? dice.reduce((a, b) => a + b, 0) : 0;
      case 'fourOfKind':
        return counts.some(c => c >= 4) ? dice.reduce((a, b) => a + b, 0) : 0;
      case 'fullHouse':
        return counts.includes(3) && counts.includes(2) ? 25 : 0;
      case 'smallStraight':
        const small = ['1234', '2345', '3456'];
        return small.some(s => sorted.join('').includes(s)) ? 30 : 0;
      case 'largeStraight':
        const large = ['12345', '23456'];
        return large.some(s => sorted.join('') === s) ? 40 : 0;
      case 'yahtzee':
        return counts.includes(5) ? 50 : 0;
      case 'chance':
        return dice.reduce((a, b) => a + b, 0);
      default:
        return 0;
    }
  };

  const selectScore = (category: keyof ScoreCard) => {
    if (scoreCard[category] !== null || rollsLeft === 3) return;

    const score = calculateScore(category);
    setScoreCard({ ...scoreCard, [category]: score });
    setRollsLeft(3);
    setHeld([false, false, false, false, false]);
    
    console.log(`[Yahtzee] Scored ${score} in ${category}`);

    // Check if game is over
    const allScored = Object.values({ ...scoreCard, [category]: score }).every(v => v !== null);
    if (allScored) {
      setGameOver(true);
      console.log('[Yahtzee] Game over!');
    }
  };

  const calculateTotal = (): number => {
    return Object.values(scoreCard).reduce((sum, val) => sum + (val || 0), 0);
  };

  const calculateBonus = (): number => {
    const upper = (scoreCard.ones || 0) + (scoreCard.twos || 0) + (scoreCard.threes || 0) +
                  (scoreCard.fours || 0) + (scoreCard.fives || 0) + (scoreCard.sixes || 0);
    return upper >= 63 ? 35 : 0;
  };

  const resetGame = () => {
    setDice([1, 1, 1, 1, 1]);
    setHeld([false, false, false, false, false]);
    setRollsLeft(3);
    setScoreCard({
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfKind: null,
      fourOfKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    });
    setGameOver(false);
    console.log('[Yahtzee] Game reset');
  };

  const categories = [
    { key: 'ones' as const, label: 'Ones' },
    { key: 'twos' as const, label: 'Twos' },
    { key: 'threes' as const, label: 'Threes' },
    { key: 'fours' as const, label: 'Fours' },
    { key: 'fives' as const, label: 'Fives' },
    { key: 'sixes' as const, label: 'Sixes' },
    { key: 'threeOfKind' as const, label: '3 of a Kind' },
    { key: 'fourOfKind' as const, label: '4 of a Kind' },
    { key: 'fullHouse' as const, label: 'Full House (25)' },
    { key: 'smallStraight' as const, label: 'Small Straight (30)' },
    { key: 'largeStraight' as const, label: 'Large Straight (40)' },
    { key: 'yahtzee' as const, label: 'Yahtzee (50)' },
    { key: 'chance' as const, label: 'Chance' },
  ];

  return (
    <div className="yahtzee-game">
      <h2>Yahtzee</h2>
      
      <div className="game-info">
        <div className="rolls-left">Rolls Left: {rollsLeft}</div>
        <div className="total-score">Total: {calculateTotal() + calculateBonus()}</div>
      </div>

      <div className="dice-container">
        {dice.map((die, index) => (
          <button
            key={index}
            className={`die ${held[index] ? 'held' : ''}`}
            onClick={() => toggleHold(index)}
          >
            {DICE_EMOJIS[die]}
          </button>
        ))}
      </div>

      <button
        className="roll-button"
        onClick={rollDice}
        disabled={rollsLeft === 0 || gameOver}
      >
        {rollsLeft === 3 ? 'Roll Dice' : `Roll Again (${rollsLeft} left)`}
      </button>

      <div className="scorecard">
        <h3>Scorecard</h3>
        <div className="score-categories">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`score-option ${scoreCard[cat.key] !== null ? 'scored' : ''}`}
              onClick={() => selectScore(cat.key)}
              disabled={scoreCard[cat.key] !== null || rollsLeft === 3}
            >
              <span className="category-name">{cat.label}</span>
              <span className="category-score">
                {scoreCard[cat.key] !== null
                  ? scoreCard[cat.key]
                  : rollsLeft < 3
                  ? `(${calculateScore(cat.key)})`
                  : '-'}
              </span>
            </button>
          ))}
        </div>
        <div className="bonus-section">
          <strong>Bonus (63+ in upper):</strong> {calculateBonus()}
        </div>
      </div>

      {gameOver && (
        <div className="game-over-section">
          <h3>Game Over!</h3>
          <p>Final Score: {calculateTotal() + calculateBonus()}</p>
          <button className="reset-button" onClick={resetGame}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
};
