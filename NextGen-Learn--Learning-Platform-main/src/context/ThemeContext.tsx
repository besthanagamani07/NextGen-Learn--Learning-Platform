/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeType = 
  | 'light' 
  | 'dark' 
  | 'purple-gradient' 
  | 'ocean' 
  | 'green-nature' 
  | 'sunset' 
  | 'ice-cool' 
  | 'pink-soft' 
  | 'midnight' 
  | 'yellow-bright' 
  | 'ai-tech' 
  | 'minimal-grey' 
  | 'galaxy' 
  | 'neon' 
  | 'classic-edu'
  | 'cyberpunk'
  | 'glassmorphism'
  | 'aqua-neon'
  | 'deep-space'
  | 'smart-ai'
  | 'brick-minimal'
  | 'rainbow-soft'
  | 'industrial-tech'
  | 'tropical'
  | 'hologram'
  | 'matrix'
  | 'frost-white'
  | 'coral'
  | 'universe'
  | 'neural-network'
  | 'saas-blue'
  | 'gradient-flow';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem('app-theme') as ThemeType;
      return saved || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle system preference if no saved theme
  useEffect(() => {
    if (!localStorage.getItem('app-theme')) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
