import { useState, useEffect } from 'react';
import type { Language } from '../types';

export const useLanguage = (): Language => {
  const [language] = useState<Language>(() => {
    // Check navigator language - default to German
    const browserLang = navigator.language.toLowerCase();
    console.log(`[Language] Browser language detected: ${browserLang}`);
    
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    return 'de'; // Default to German
  });

  useEffect(() => {
    console.log(`[Language] Language set to: ${language}`);
  }, [language]);

  return language;
};
