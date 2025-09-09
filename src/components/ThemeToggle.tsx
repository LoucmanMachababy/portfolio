'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Basculer vers le thème ${resolvedTheme === 'light' ? 'sombre' : 'clair'}`}
    >
      <motion.div
        className="relative w-5 h-5"
        initial={false}
        animate={{ rotate: resolvedTheme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {resolvedTheme === 'light' ? (
          <Sun size={20} className="text-foreground" />
        ) : (
          <Moon size={20} className="text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
