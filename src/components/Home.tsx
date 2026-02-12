import React from 'react';
import { t } from '../utils/translations';
import type { Language } from '../types';
import './Home.css';

interface HomeProps {
  language: Language;
}

export const Home: React.FC<HomeProps> = ({ language }) => {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">👋 {t('welcome', language)}</h1>
        <p className="hero-text">{t('welcomeText', language)}</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">🔗</span>
          <h3>{t('socialMedia', language)}</h3>
          <p>Finde mich auf verschiedenen Plattformen</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎮</span>
          <h3>{t('browserGames', language)}</h3>
          <p>Spiele unterhaltsame Browser-Spiele</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📝</span>
          <h3>{t('myBlog', language)}</h3>
          <p>Lese meine neuesten Beiträge</p>
        </div>
      </div>
      
      <div className="privacy-notice">
        <p>ℹ️ {t('privacyNotice', language)}</p>
      </div>
    </div>
  );
};
