import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Links } from './components/Links';
import { Games } from './components/Games';
import { Blog } from './components/Blog';
import { TicTacToe } from './games/TicTacToe';
import { Snake } from './games/Snake';
import { Memory } from './games/Memory';
import { RockPaperScissors } from './games/RockPaperScissors';
import { Yahtzee } from './games/Yahtzee';
import { Battleship } from './games/Battleship';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { t } from './utils/translations';
import './App.css';

function App() {
  const theme = useTheme();
  const language = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    console.log('[App] Application initialized');
    console.log('[App] Theme:', theme);
    console.log('[App] Language:', language);
    console.log('[App] All data is stored locally in browser localStorage');
    console.log('[App] No cookies, no tracking, DSGVO compliant');
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedGame(null);
    console.log(`[App] Navigated to: ${page}`);
  };

  const handleSelectGame = (game: string) => {
    setSelectedGame(game);
    console.log(`[App] Selected game: ${game}`);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'tictactoe':
        return <TicTacToe />;
      case 'snake':
        return <Snake />;
      case 'memory':
        return <Memory />;
      case 'rps':
        return <RockPaperScissors />;
      case 'yahtzee':
        return <Yahtzee />;
      case 'battleship':
        return <Battleship />;
      default:
        return null;
    }
  };

  const renderPage = () => {
    if (currentPage === 'games' && selectedGame) {
      return (
        <div className="game-container">
          <div className="game-header">
            <button className="back-button" onClick={() => setSelectedGame(null)}>
              ← {t('backToGames', language)}
            </button>
          </div>
          {renderGame()}
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home language={language} />;
      case 'links':
        return <Links language={language} />;
      case 'games':
        return <Games language={language} onSelectGame={handleSelectGame} />;
      case 'blog':
        return <Blog language={language} />;
      default:
        return <Home language={language} />;
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
      />
      <main className="container">
        {renderPage()}
      </main>
      <footer className="footer">
        <p>© 2024 | {t('privacyNotice', language)}</p>
      </footer>
    </div>
  );
}

export default App;
