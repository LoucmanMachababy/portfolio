'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import ConfettiEffect from './ConfettiEffect';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const ContactSection = ({ onBack }) => {
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setNotification(null);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const title = 'Nouveau message depuis le portfolio';
    const time = new Date().toLocaleString();

    emailjs.send(
      'service_ijqcgmf',
      'template_9o6on07',
      {
        name,
        email,
        message,
        title,
        time
      },
      'FNaCkd48052cJ6ssL'
    )
    .then(() => {
      setNotification({ type: 'success', text: 'Message envoyé avec succès !' });
      form.reset();
    })
    .catch(() => {
      setNotification({ type: 'error', text: 'Erreur lors de l\'envoi du message.' });
    })
    .finally(() => setSending(false));
  };

  return (
    <section className="contact-section">
      <ThemeToggle />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
            <button className="back-button" onClick={onBack} style={{ marginRight: 16 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Retour au menu
            </button>
            <h2 className="section-title">Contactez-moi</h2>
            <p className="section-subtitle">Développeur web freelance à Annecy & Lyon - Devis gratuit sous 24h</p>
        </div>

        <div className="contact-cta-section">
          <h3>Prêt à démarrer votre projet ?</h3>
          <div className="main-cta-buttons">
            <a
              href="mailto:machababyloucman@gmail.com?subject=Demande de devis - Développement web&body=Bonjour Loucman,%0D%0A%0D%0AJe souhaiterais obtenir un devis pour :%0D%0A%0D%0A- Type de projet :%0D%0A- Budget approximatif :%0D%0A- Délai souhaité :%0D%0A- Autres informations :%0D%0A%0D%0AMerci !"
              className="cta-primary large"
            >
              📧 Demander un devis gratuit
            </a>
            <a
              href="https://calendly.com/machababyloucman/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary large"
            >
              📅 Prendre rendez-vous
            </a>
          </div>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-title">Informations de contact</h3>

            <div className="nap-info">
              <h4>Loucman Machababy</h4>
              <p>Développeur web freelance</p>
            </div>

            <div className="contact-item">
              <div className="contact-label">📧 Email professionnel</div>
              <a href="mailto:machababyloucman@gmail.com" className="contact-value">machababyloucman@gmail.com</a>
            </div>

            <div className="contact-item">
              <div className="contact-label">📞 Téléphone</div>
              <a href="tel:+33627097724" className="contact-value">06 27 09 77 24</a>
            </div>

            <div className="contact-item">
              <div className="contact-label">📍 Zones d'intervention</div>
              <div className="contact-value">
                <strong>Annecy et environs</strong><br/>
                <strong>Lyon et environs</strong><br/>
                <em>Déplacements possibles dans toute la région</em>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-label">🕒 Disponibilité</div>
              <div className="contact-value">
                Lundi - Vendredi : 9h - 18h<br/>
                Réponse sous 24h garantie
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-label">💼 LinkedIn</div>
              <a href="https://www.linkedin.com/in/loucman-machababy/" target="_blank" rel="noopener noreferrer" className="contact-value">linkedin.com/in/loucman-machababy</a>
            </div>

            <div className="specialties">
              <h4>Spécialités</h4>
              <ul>
                <li>✅ Sites vitrines et e-commerce</li>
                <li>✅ Applications React/Next.js</li>
                <li>✅ Refonte et modernisation</li>
                <li>✅ Maintenance et support</li>
                <li>✅ SEO technique</li>
              </ul>
            </div>
          </div>
          <div className="contact-form">
            <h3 className="contact-title">Parlez-moi de votre projet</h3>
            <p className="form-description">Décrivez-moi votre projet et je vous recontacte rapidement avec un devis personnalisé.</p>

            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nom / Entreprise *</label>
                <input type="text" id="name" name="name" className="form-input" required placeholder="Votre nom ou nom d'entreprise" />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input type="email" id="email" name="email" className="form-input" required placeholder="votre@email.com" />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Téléphone</label>
                <input type="tel" id="phone" name="phone" className="form-input" placeholder="06 XX XX XX XX" />
              </div>

              <div className="form-group">
                <label htmlFor="project-type" className="form-label">Type de projet</label>
                <select id="project-type" name="project-type" className="form-input">
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="site-vitrine">Site vitrine</option>
                  <option value="e-commerce">Site e-commerce</option>
                  <option value="application">Application web</option>
                  <option value="refonte">Refonte de site existant</option>
                  <option value="maintenance">Maintenance / Support</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Description du projet *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  required
                  placeholder="Décrivez votre projet, vos objectifs, votre budget approximatif et vos délais..."
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="form-button" disabled={sending}>
                {sending ? 'Envoi en cours...' : '📧 Envoyer ma demande'}
              </button>
            </form>

            {notification && (
              <div className={`notification notification-${notification.type}`}>{notification.text}</div>
            )}
            {notification && notification.type === 'success' && <ConfettiEffect />}
          </div>
        </div>

        <div className="guarantees-section">
          <h3>Mes engagements</h3>
          <div className="guarantees-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">⚡</div>
              <h4>Réactivité</h4>
              <p>Réponse sous 24h garantie</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">💰</div>
              <h4>Devis gratuit</h4>
              <p>Estimation détaillée sans engagement</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">🎯</div>
              <h4>Suivi personnalisé</h4>
              <p>Accompagnement tout au long du projet</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">🔧</div>
              <h4>Support inclus</h4>
              <p>Maintenance et corrections post-livraison</p>
            </div>
          </div>
        </div>

        <div className="cv-download">
           <h3>Mon CV professionnel</h3>
           <p className="cv-description">Téléchargez mon CV pour découvrir mon parcours et mes compétences techniques détaillées.</p>
           <div className="cv-download-options">
             <button
               className="project-link demo-link"
               onClick={() => {
                 const link = document.createElement('a');
                 link.href = '/cv/cv-loucman-machababy.pdf';
                 link.download = 'cv-loucman-machababy.pdf';
                 document.body.appendChild(link);
                 link.click();
                 document.body.removeChild(link);
               }}
             >
               📄 Télécharger mon CV
             </button>
           </div>
         </div>

      </motion.div>
    </section>
  );
};

export default ContactSection;