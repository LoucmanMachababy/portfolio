'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '/', label: 'Accueil' },
  { href: '#projects', label: 'Projets' },
  { href: '#services', label: 'Mes Services' },
  { href: '#about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Détecter quelle section est visible
      const sections = ['projects', 'services', 'about'];
      let currentSection = '';
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top <= 100 && rect.bottom >= 100;
          
          if (isVisible && pathname === '/') {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      if (pathname === '/') {
        setActiveSection(currentSection);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  const [activeSection, setActiveSection] = useState('');

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href === '#projects') {
      e.preventDefault();
      setActiveSection('projects');
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (href === '#services') {
      e.preventDefault();
      setActiveSection('services');
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (href === '#about') {
      e.preventDefault();
      setActiveSection('about');
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      setActiveSection('');
    }
  };

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="relative w-8 h-8 rounded-lg overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/loucman-machababy.jpg"
                alt="Loucman Machababy"
                fill
                className="object-cover"
                sizes="32px"
                priority
              />
            </motion.div>
            <span className="text-xl font-bold text-foreground font-heading group-hover:text-primary transition-colors duration-200">
              Loucman Machababy
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 relative',
                  (pathname === item.href || 
                   (item.href === '#projects' && activeSection === 'projects') ||
                   (item.href === '#services' && activeSection === 'services') ||
                   (item.href === '#about' && activeSection === 'about'))
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {(pathname === item.href || 
                  (item.href === '#projects' && activeSection === 'projects') ||
                  (item.href === '#services' && activeSection === 'services') ||
                  (item.href === '#about' && activeSection === 'about')) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={18} className="text-foreground" />
              ) : (
                <Moon size={18} className="text-foreground" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-card border border-border"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(item.href, e);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'block text-sm font-medium transition-colors duration-200 py-2',
                    (pathname === item.href || 
                     (item.href === '#projects' && activeSection === 'projects') ||
                     (item.href === '#services' && activeSection === 'services') ||
                     (item.href === '#about' && activeSection === 'about'))
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
