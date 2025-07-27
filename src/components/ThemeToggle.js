'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Basculer vers le thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <span className="theme-icon">
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
      <span className="theme-label">
        {theme === 'dark' ? 'Sombre' : 'Clair'}
      </span>
    </button>
  );
};

export default ThemeToggle;
