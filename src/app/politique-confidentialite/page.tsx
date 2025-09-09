import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles - Loucman Machababy.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground font-heading mb-8">
            Politique de confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Collecte des données</h2>
                <p className="text-muted-foreground">
                  Les données personnelles collectées sur ce site sont limitées aux informations que vous choisissez de nous communiquer 
                  via le formulaire de contact (nom, email, sujet, message). Ces données sont collectées uniquement dans le but de 
                  répondre à vos demandes et de vous fournir les services demandés.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Utilisation des données</h2>
                <p className="text-muted-foreground">
                  Les données personnelles que vous nous communiquez sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                  <li>Répondre à vos demandes de contact</li>
                  <li>Vous fournir des devis personnalisés</li>
                  <li>Assurer le suivi de nos échanges</li>
                  <li>Améliorer nos services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Conservation des données</h2>
                <p className="text-muted-foreground">
                  Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de notre dernier échange, 
                  sauf obligation légale contraire. Passé ce délai, vos données seront supprimées de nos systèmes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Partage des données</h2>
                <p className="text-muted-foreground">
                  Vos données personnelles ne sont en aucun cas vendues, louées ou partagées avec des tiers, 
                  sauf dans les cas suivants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour répondre à une obligation légale</li>
                  <li>Pour protéger nos droits et notre sécurité</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Vos droits</h2>
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                  <li>Droit de limitation du traitement</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Pour exercer ces droits, contactez-moi à l'adresse : machababyloucman@gmail.com
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
                <p className="text-muted-foreground">
                  Ce site utilise des cookies techniques nécessaires au bon fonctionnement du site. 
                  Aucun cookie de tracking ou de publicité n'est utilisé. 
                  Vous pouvez configurer votre navigateur pour refuser les cookies si vous le souhaitez.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Sécurité</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données 
                  contre tout accès non autorisé, altération, divulgation ou destruction. 
                  Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications</h2>
                <p className="text-muted-foreground">
                  Cette politique de confidentialité peut être modifiée à tout moment. 
                  Les modifications prendront effet dès leur publication sur cette page. 
                  Nous vous encourageons à consulter régulièrement cette page pour rester informé.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité ou le traitement de vos données, 
                  vous pouvez me contacter à l'adresse : machababyloucman@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


