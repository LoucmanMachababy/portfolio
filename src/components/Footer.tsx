'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
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
    <footer className="bg-card border-t border-border mt-20">
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="/images/loucman-machababy.jpg"
                    alt="Loucman Machababy"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="text-xl font-bold text-foreground font-heading">
                  Loucman Machababy
                </span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Développeur web freelance spécialisé en création de sites vitrines, 
                e-commerce et applications React/Next.js.
              </p>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                <span>Annecy & Lyon, France</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#projects"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('projects');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Projets
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('about');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold">Réseaux sociaux</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={18} className="text-foreground" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Loucman Machababy. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
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


