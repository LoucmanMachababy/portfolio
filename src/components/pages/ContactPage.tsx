'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactForm } from '@/types';
import { cn } from '@/lib/utils';

const schema = yup.object({
  name: yup.string().required('Le nom est requis').min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  subject: yup.string().required('Le sujet est requis').min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: yup.string().required('Le message est requis').min(10, 'Le message doit contenir au moins 10 caractères'),
});

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'machababyloucman@gmail.com',
    href: 'mailto:machababyloucman@gmail.com',
    description: 'Réponse sous 24h',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 27 09 77 24',
    href: 'tel:+33627097724',
    description: 'Lun - Ven, 9h - 18h',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Annecy & Lyon',
    href: '#',
    description: 'France',
  },
  {
    icon: Clock,
    label: 'Disponibilité',
    value: 'Disponible',
    href: '#',
    description: 'Pour de nouveaux projets',
  },
];

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Envoi via Formspree
      const response = await fetch('https://formspree.io/f/mqapdgvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-heading mb-6">
              Contactez-<span className="text-gradient">moi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter 
              de vos besoins et obtenir un devis personnalisé.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-card border border-border rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{info.label}</h3>
                  {info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? (
                    <a
                      href={info.href}
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{info.value}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={ref} className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground font-heading mb-4">
                  Envoyez-moi un message
                </h2>
                <p className="text-muted-foreground">
                  Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
                      errors.name ? 'border-red-500' : 'border-border'
                    )}
                    placeholder="Votre nom complet"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
                      errors.email ? 'border-red-500' : 'border-border'
                    )}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Sujet *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
                      errors.subject ? 'border-red-500' : 'border-border'
                    )}
                    placeholder="Sujet de votre message"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.subject.message}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none',
                      errors.message ? 'border-red-500' : 'border-border'
                    )}
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.message.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary px-8 py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="text-green-800 dark:text-green-200">
                      Message envoyé avec succès ! Je vous répondrai dans les 24h.
                    </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={20} className="text-red-600" />
                    <span className="text-red-800 dark:text-red-200">
                      Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Response Time */}
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-2xl p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                    <Clock size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Réponse rapide garantie
                  </h3>
                  <p className="text-muted-foreground">
                    Je m'engage à vous répondre dans les 24h pour tous vos projets et demandes.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Disponible maintenant</span>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Mon processus de travail
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Échange initial', description: 'Discussion de vos besoins et objectifs' },
                    { step: '2', title: 'Devis détaillé', description: 'Proposition personnalisée sous 24h' },
                    { step: '3', title: 'Développement', description: 'Création de votre solution web' },
                    { step: '4', title: 'Livraison', description: 'Mise en ligne et formation incluse' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Mes garanties
                </h3>
                <div className="space-y-4">
                  {[
                    'Devis gratuit sous 24h',
                    'Maintenance incluse 3 mois',
                    'Formation à l\'utilisation',
                    'Support technique réactif',
                    'Code propre et documenté',
                  ].map((guarantee, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle size={20} className="text-primary" />
                      <span className="text-muted-foreground">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


