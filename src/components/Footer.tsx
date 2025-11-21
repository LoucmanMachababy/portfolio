'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/loucmanmachababy',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/loucman-machababy',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:machababyloucman@gmail.com',
    icon: Mail,
  },
];

const footerLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/20 shadow-lg shadow-primary/10">
                  <Image
                    src="/images/loucman-machababy.jpg"
                    alt="Loucman Machababy"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground font-heading block">
                    Loucman Machababy
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-500 font-medium uppercase tracking-wide">
                      Disponible pour projets
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Développeur web freelance spécialisé en création de sites vitrines,
                e-commerce et applications React/Next.js.
              </p>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm bg-card/50 w-fit px-3 py-1.5 rounded-full border border-border/50">
                <MapPin size={14} className="text-primary" />
                <span>Annecy & Lyon, France</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-foreground font-bold text-lg">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#projects"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('projects');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Projets
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('about');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    À propos
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-foreground font-bold text-lg">Réseaux sociaux</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Loucman Machababy. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


