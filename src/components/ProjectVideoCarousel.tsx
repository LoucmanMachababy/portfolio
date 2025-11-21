'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight, Server, Database, Shield, Zap, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isMobile?: boolean;
  backendDetails?: {
    architecture: string;
    database: string;
    security: string[];
    apis: string[];
    features: string[];
  };
}

const projectVideos: ProjectVideo[] = [
  {
    id: '1',
    title: 'Neotech E-commerce',
    description: 'Plateforme e-commerce complète pour la vente de produits tech avec gestion avancée des stocks et back-office administrateur.',
    videoUrl: '/videos/Demo_Neotech.mp4',
    thumbnail: '/images/neotech-thumb.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/loucmanmachababy/neotech-ecommerce',
    liveUrl: 'https://neotech-demo.vercel.app',
    backendDetails: {
      architecture: 'API REST avec Next.js API Routes, architecture modulaire (services, controllers, models)',
      database: 'Firebase Firestore pour produits, commandes, utilisateurs et stocks en temps réel',
      security: ['Authentification JWT', 'Protection CSRF/XSS', 'Validation côté serveur', 'Webhooks Stripe sécurisés'],
      apis: ['API Stripe pour paiements', 'Webhooks pour synchronisation', 'API Firebase pour données temps réel'],
      features: ['Gestion des stocks automatique', 'Dashboard admin protégé (RBAC)', 'Cache Firebase pour performance', 'Système de commandes asynchrone']
    },
  },
  {
    id: '2',
    title: 'Qaaswa',
    description: 'Application web complète avec gestion avancée et fonctionnalités professionnelles.',
    videoUrl: '/videos/Demo-qaaswa.mov',
    thumbnail: '/images/qaaswa-thumb.jpg',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS'],
    githubUrl: '#',
    liveUrl: '#',
    backendDetails: {
      architecture: 'API REST avec Next.js API Routes, architecture modulaire et scalable',
      database: 'Firebase Firestore pour données en temps réel avec structure optimisée',
      security: ['Authentification sécurisée', 'Protection CSRF/XSS', 'Validation côté serveur', 'Gestion des permissions'],
      apis: ['API REST complète', 'Intégrations tierces', 'API Firebase pour données temps réel'],
      features: ['Gestion de données avancée', 'Dashboard administrateur', 'Système de notifications', 'Optimisation des performances']
    },
  },
  {
    id: '3',
    title: 'AuditIA Pro',
    description: 'Plateforme d\'audit intelligente avec IA pour l\'analyse et l\'évaluation automatisée.',
    videoUrl: '/videos/Demo-auditIa-pro.mov',
    thumbnail: '/images/auditia-pro-thumb.jpg',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'AI/ML', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: '#',
    liveUrl: '#',
    backendDetails: {
      architecture: 'API REST Node.js/Express avec intégration IA, architecture microservices',
      database: 'PostgreSQL pour données structurées avec optimisations de requêtes complexes',
      security: ['Authentification JWT multi-niveaux', 'Chiffrement des données sensibles', 'Protection contre les injections', 'Audit logs'],
      apis: ['API REST pour gestion des audits', 'API IA pour analyse automatisée', 'Webhooks pour notifications', 'API d\'export de rapports'],
      features: ['Traitement IA des données', 'Génération automatique de rapports', 'Dashboard analytique', 'Système de workflow avancé']
    },
  },
  {
    id: '4',
    title: 'My Quizz',
    description: 'Application de quiz interactif avec système de scores, questions personnalisées et classements en temps réel.',
    videoUrl: '/videos/Demy_MyQuizz.mp4',
    thumbnail: '/images/my-quizz-thumb.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/loucmanmachababy/my-quizz',
    liveUrl: '#',
    backendDetails: {
      architecture: 'API REST Node.js/Express avec architecture MVC, WebSocket pour temps réel',
      database: 'MongoDB avec schémas Mongoose pour questions, scores, utilisateurs et sessions',
      security: ['Authentification JWT', 'Validation des données avec Joi', 'Rate limiting', 'Protection contre les injections'],
      apis: ['API REST pour CRUD quiz', 'WebSocket Socket.io pour scores temps réel', 'API de classement optimisée'],
      features: ['Système de scoring en temps réel', 'Classements dynamiques', 'Gestion de sessions multi-joueurs', 'Cache Redis pour performance']
    },
  },
  {
    id: '5',
    title: 'Kyol Poke',
    description: 'Application innovante pour commander des poke bowls via distributeurs automatiques avec back-office complet.',
    videoUrl: '/videos/Demo-kyol.mov',
    thumbnail: '/images/kyol-poke-thumb.jpg',
    technologies: ['Next.js', 'Firebase', 'TypeScript', 'Stripe', 'IoT'],
    githubUrl: 'https://github.com/loucmanmachababy/kyol-poke',
    liveUrl: 'https://kyol-poke.vercel.app',
    backendDetails: {
      architecture: 'API Next.js avec intégration IoT, architecture événementielle pour distributeurs',
      database: 'Firebase Firestore pour commandes, stocks distributeurs, utilisateurs et historique',
      security: ['Authentification multi-niveaux', 'Validation paiements Stripe', 'Sécurisation API IoT', 'Logs d\'audit'],
      apis: ['API Stripe pour paiements', 'API IoT pour contrôle distributeurs', 'Webhooks pour synchronisation', 'API admin pour gestion'],
      features: ['Gestion de stocks en temps réel', 'Système de commandes IoT', 'Back-office administrateur complet', 'Notifications automatiques']
    },
  },
];

export function ProjectVideoCarousel() {
  const [activeProject, setActiveProject] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentProject = projectVideos[activeProject];

  const handleProjectChange = (index: number) => {
    setActiveProject(index);
  };

  const goToPrevious = () => {
    setActiveProject((prev) => (prev === 0 ? projectVideos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveProject((prev) => (prev === projectVideos.length - 1 ? 0 : prev + 1));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleVideoEnded = () => {
    goToNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Project Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {projectVideos.map((project, index) => (
          <button
            key={project.id}
            onClick={() => handleProjectChange(index)}
            className={cn(
              'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border',
              activeProject === index
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                : 'bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground hover:border-primary/30'
            )}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-md border border-border/50 text-foreground rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-primary/50 shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-md border border-border/50 text-foreground rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-primary/50 shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        <motion.div
          className="relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          layout
          transition={{ duration: 0.5 }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

          <div className={`relative z-10 ${currentProject.isMobile ? 'aspect-[9/16] max-w-sm mx-auto my-8 rounded-[2rem] overflow-hidden ring-8 ring-black' : 'aspect-video'}`}>
            <video
              key={currentProject.id}
              className={`w-full h-full ${currentProject.isMobile ? 'object-cover' : 'object-cover'}`}
              poster={currentProject.thumbnail}
              muted={isMuted}
              controls={false}
              autoPlay
              loop
              playsInline
              onEnded={handleVideoEnded}
            >
              <source src={currentProject.videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={toggleMute}
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {projectVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleProjectChange(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              activeProject === index
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted hover:bg-primary/50'
            )}
          />
        ))}
      </div>

      {/* Project Info Section */}
      <motion.div
        className="mt-12"
        key={currentProject.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {currentProject.title}
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-3xl mx-auto leading-relaxed">
            {currentProject.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {currentProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-background border border-border rounded-full text-sm font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Backend Behind the Scenes */}
        {currentProject.backendDetails && (
          <motion.div
            className="glass-card p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center space-x-3 mb-8 relative z-10">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground">
                Architecture & Backend
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* Architecture */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-primary">
                  <Code size={18} />
                  <h5 className="font-semibold">Architecture</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/20">
                  {currentProject.backendDetails.architecture}
                </p>
              </div>

              {/* Database */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-secondary">
                  <Database size={18} />
                  <h5 className="font-semibold">Base de données</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6 border-l-2 border-secondary/20">
                  {currentProject.backendDetails.database}
                </p>
              </div>

              {/* Security */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-accent">
                  <Shield size={18} />
                  <h5 className="font-semibold">Sécurité</h5>
                </div>
                <ul className="space-y-2 pl-6 border-l-2 border-accent/20">
                  {currentProject.backendDetails.security.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* APIs */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-orange-500">
                  <Zap size={18} />
                  <h5 className="font-semibold">APIs & Intégrations</h5>
                </div>
                <ul className="space-y-2 pl-6 border-l-2 border-orange-500/20">
                  {currentProject.backendDetails.apis.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features Tags */}
            <div className="mt-8 pt-8 border-t border-border/50 relative z-10">
              <h5 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider opacity-70">Fonctionnalités Clés</h5>
              <div className="flex flex-wrap gap-2">
                {currentProject.backendDetails.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/5 border border-primary/10 text-primary rounded-lg text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

