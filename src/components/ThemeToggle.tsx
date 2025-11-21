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
        'relative p-2.5 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'
      )}
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Basculer vers le thème ${resolvedTheme === 'light' ? 'sombre' : 'clair'}`}
    >
      <motion.div
        className="relative w-5 h-5"
        initial={false}
        animate={{ rotate: resolvedTheme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {resolvedTheme === 'light' ? (
          <Sun size={20} className="text-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Moon size={20} className="text-foreground group-hover:text-primary transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
