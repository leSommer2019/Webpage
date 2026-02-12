import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
      console.log(`[Theme] System preference changed to: ${e.matches ? 'dark' : 'light'}`);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    console.log(`[Theme] Initial theme set to: ${theme}`);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return theme;
};
