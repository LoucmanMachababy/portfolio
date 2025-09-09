'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Skill } from '@/types';

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'HTML/CSS', level: 95, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Express', level: 75, category: 'backend' },
  { name: 'PHP', level: 70, category: 'backend' },
  { name: 'Laravel', level: 65, category: 'backend' },
  
  // Database
  { name: 'Firebase', level: 85, category: 'database' },
  { name: 'Supabase', level: 80, category: 'database' },
  { name: 'MySQL', level: 80, category: 'database' },
  { name: 'PostgreSQL', level: 70, category: 'database' },
  { name: 'MongoDB', level: 65, category: 'database' },
  
  // Tools
  { name: 'Git', level: 85, category: 'tools' },
  { name: 'Docker', level: 60, category: 'tools' },
  { name: 'Figma', level: 70, category: 'design' },
];

const categories = [
  { key: 'frontend', label: 'Frontend', color: 'bg-blue-500' },
  { key: 'backend', label: 'Backend', color: 'bg-green-500' },
  { key: 'database', label: 'Base de données', color: 'bg-orange-500' },
  { key: 'tools', label: 'Outils', color: 'bg-purple-500' },
  { key: 'design', label: 'Design', color: 'bg-pink-500' },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Mes compétences
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une expertise technique solide dans les technologies modernes du développement web.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category.key);
            
            return (
              <motion.div
                key={category.key}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${category.color} rounded-full`} />
                  <h3 className="text-2xl font-semibold text-foreground">
                    {category.label}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Formation continue
            </h3>
            <p className="text-muted-foreground">
              Je me forme continuellement aux nouvelles technologies et tendances du web 
              pour vous proposer les solutions les plus modernes et performantes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
