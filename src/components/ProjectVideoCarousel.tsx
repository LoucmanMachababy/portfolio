'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
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
  isMobile?: boolean; // Pour les vidéos filmées en mode mobile
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
  },
  {
    id: '2',
    title: 'My Snapchat',
    description: 'Application mobile de messagerie instantanée avec partage de photos et vidéos éphémères, inspirée de Snapchat.',
    videoUrl: '/videos/Demo_my_snapchat.mp4',
    thumbnail: '/images/my-snapchat-thumb.jpg',
    technologies: ['React Native', 'Firebase', 'JavaScript', 'Expo'],
    githubUrl: 'https://github.com/loucmanmachababy/my-snapchat',
    liveUrl: '#',
    isMobile: true, // Vidéo filmée en mode mobile
  },
  {
    id: '3',
    title: 'My Quizz',
    description: 'Application de quiz interactif avec système de scores, questions personnalisées et classements en temps réel.',
    videoUrl: '/videos/Demy_MyQuizz.mp4',
    thumbnail: '/images/my-quizz-thumb.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/loucmanmachababy/my-quizz',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Kyol Poke',
    description: 'Application innovante pour commander des poke bowls via distributeurs automatiques avec back-office complet.',
    videoUrl: '/videos/Demo-kyol.mov',
    thumbnail: '/images/kyol-poke-thumb.jpg',
    technologies: ['Next.js', 'Firebase', 'TypeScript', 'Stripe', 'IoT'],
    githubUrl: 'https://github.com/loucmanmachababy/kyol-poke',
    liveUrl: 'https://kyol-poke.vercel.app',
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

  // Gestion des touches clavier
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

  // Gestion de la fin de vidéo
  const handleVideoEnded = () => {
    goToNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Project Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {projectVideos.map((project, index) => (
          <button
            key={project.id}
            onClick={() => handleProjectChange(index)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-200',
              activeProject === index
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            )}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        <motion.div
          className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
          layout
          transition={{ duration: 0.5 }}
        >
          <div className={`relative ${currentProject.isMobile ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'}`}>
          {/* Video Element */}
          <video
            key={currentProject.id}
            className={`w-full h-full ${currentProject.isMobile ? 'object-contain' : 'object-cover'}`}
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

          {/* Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>

        </motion.div>
      </div>

      {/* Project Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {projectVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleProjectChange(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-200',
              activeProject === index
                ? 'bg-primary'
                : 'bg-muted hover:bg-muted/80'
            )}
          />
        ))}
      </div>

      {/* Project Info Section */}
      <motion.div
        className="mt-8 text-center"
        key={currentProject.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {currentProject.title}
        </h3>
        <p className="text-muted-foreground text-lg mb-6 max-w-3xl mx-auto">
          {currentProject.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {currentProject.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

      </motion.div>
    </div>
  );
}

