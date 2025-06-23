'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import ConfettiEffect from './ConfettiEffect';
import Image from 'next/image';

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
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-title">Mes coordonnées</h3>
            <div className="contact-item">
              <div className="contact-label">Téléphone</div>
              <div className="contact-value">+33 6 27 09 77 24</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <a href="mailto:machababyloucman@gmail.com" className="contact-value">machababyloucman@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">LinkedIn</div>
              <a href="https://www.linkedin.com/in/loucman-machababy/" target="_blank" rel="noopener noreferrer" className="contact-value">linkedin.com/in/loucman-machababy</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">GitHub</div>
              <a href="https://github.com/LoucmanMachababy" target="_blank" rel="noopener noreferrer" className="contact-value">github.com/LoucmanMachababy</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">Localisation</div>
              <div className="contact-value">Lyon / Annecy</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Âge</div>
              <div className="contact-value">21 ans (11/09/2003)</div>
            </div>
            <div style={{ marginTop: 30, textAlign: 'center' }}>
              <h4 style={{ color: '#ffd700', fontWeight: 700, marginBottom: 8 }}>Ajoute-moi sur LinkedIn</h4>
              <a href="https://www.linkedin.com/in/loucman-machababy/" target="_blank" rel="noopener noreferrer">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.linkedin.com/in/loucman-machababy/" alt="QR Code LinkedIn" width={120} height={120} style={{ borderRadius: 16, boxShadow: '0 2px 12px #ffd70088', background: '#fff' }} />
              </a>
              <div style={{ color: '#fff', fontSize: 13, marginTop: 4, opacity: 0.7 }}>Scanne-moi !</div>
            </div>
          </div>
          <div className="contact-form">
            <h3 className="contact-title">Envoyer un message</h3>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" id="name" name="name" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" className="form-textarea" required></textarea>
              </div>
              <button type="submit" className="form-button" disabled={sending}>{sending ? 'Envoi en cours...' : 'Envoyer'}</button>
            </form>
            {notification && (
              <div className={`notification notification-${notification.type}`}>{notification.text}</div>
            )}
            {notification && notification.type === 'success' && <ConfettiEffect />}
          </div>
        </div>

        <div className="cv-download">
           <p className="cv-description">Vous pouvez également télécharger mon CV pour plus de détails sur mon parcours.</p>
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
               Télécharger CV (PDF)
             </button>
           </div>
         </div>

      </motion.div>
    </section>
  );
};

export default ContactSection;