import React from 'react';
import { socialLinks } from '../data/links';
import { t } from '../utils/translations';
import type { Language } from '../types';
import './Links.css';

interface LinksProps {
  language: Language;
}

export const Links: React.FC<LinksProps> = ({ language }) => {
  return (
    <div className="links">
      <h1>{t('myLinks', language)}</h1>
      <div className="links-grid">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <span className="link-icon">{link.icon}</span>
            <span className="link-name">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
