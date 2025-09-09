'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page non trouvée
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Home size={18} />
            <span>Retour à l'accueil</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Page précédente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
