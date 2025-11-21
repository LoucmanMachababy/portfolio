'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Skill } from '@/types';
import { Sparkles, GraduationCap } from 'lucide-react';

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Express', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Supabase', level: 85, category: 'backend' },

  // Tools & Others
  { name: 'Git', level: 85, category: 'tools' },
  { name: 'Docker', level: 60, category: 'tools' },
  { name: 'Figma', level: 70, category: 'design' },
  { name: 'SEO', level: 75, category: 'marketing' },
];

const categories = [
  { key: 'frontend', label: 'Frontend', color: 'from-blue-500 to-cyan-400' },
  { key: 'backend', label: 'Backend', color: 'from-green-500 to-emerald-400' },
  { key: 'tools', label: 'Outils & DevOps', color: 'from-purple-500 to-pink-400' },
  { key: 'design', label: 'Design & Autres', color: 'from-orange-500 to-yellow-400' },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getSkillsByCategory = (category: string) => {
    if (category === 'design') {
      return skills.filter(skill => skill.category === 'design' || skill.category === 'marketing');
    }
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section ref={ref} className="section-padding relative">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <Sparkles className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-semibold">Expertise Technique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-heading mb-6">
            Mes <span className="text-gradient">Compétences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une maîtrise approfondie des technologies modernes pour construire des applications robustes et évolutives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category.key);

            return (
              <motion.div
                key={category.key}
                className="glass-card p-8 hover:border-primary/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.label}
                </h3>

                <div className="space-y-6">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass-card p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Formation continue & Veille technologique
              </h3>
              <p className="text-muted-foreground">
                Le web évolue vite, et moi aussi. Je consacre une partie de mon temps chaque semaine à apprendre de nouvelles technologies et à perfectionner mes acquis pour vous offrir le meilleur.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
