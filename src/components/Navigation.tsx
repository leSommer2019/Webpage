import React from 'react';
import { t } from '../utils/translations';
import type { Language } from '../types';
import './Navigation.css';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, language }) => {
  const pages = ['home', 'links', 'games', 'blog', 'downloads'];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">My Page</span>
        </div>
        <div className="nav-links">
          {pages.map((page) => (
            <button
              key={page}
              className={`nav-link ${currentPage === page ? 'active' : ''}`}
              onClick={() => onNavigate(page)}
            >
              {t(page, language)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
