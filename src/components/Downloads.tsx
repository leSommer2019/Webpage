import React from 'react';
import { downloadFiles } from '../data/downloads';
import { t } from '../utils/translations';
import type { Language } from '../types';
import './Downloads.css';

interface DownloadsProps {
  language: Language;
}

export const Downloads: React.FC<DownloadsProps> = ({ language }) => {
  return (
    <div className="downloads">
      <h1>{t('myDownloads', language)}</h1>
      <div className="downloads-grid">
        {downloadFiles.map((file) => (
          <a
            key={file.name}
            href={file.path}
            download
            className="download-card"
          >
            <span className="download-icon">{file.icon}</span>
            <div className="download-info">
              <span className="download-name">{file.name}</span>
              <span className="download-size">{file.size}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
