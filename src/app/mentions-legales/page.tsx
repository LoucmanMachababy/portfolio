import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site de Loucman Machababy - Développeur web freelance.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground font-heading mb-8">
            Mentions légales
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Éditeur du site</h2>
                <p className="text-muted-foreground">
                  <strong>Loucman Machababy</strong><br />
                  Développeur web freelance<br />
                  Email : machababyloucman@gmail.com<br />
                  Téléphone : +33 6 27 09 77 24<br />
                  Localisation : Annecy & Lyon, France
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Hébergement</h2>
                <p className="text-muted-foreground">
                  Ce site est hébergé par Vercel Inc.<br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789, USA
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Responsabilité</h2>
                <p className="text-muted-foreground">
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
                  mais peut toutefois contenir des inexactitudes ou des omissions. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                  merci de bien vouloir le signaler par email, à l'adresse machababyloucman@gmail.com, en décrivant le problème de la manière la plus précise possible.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Liens hypertextes</h2>
                <p className="text-muted-foreground">
                  Ce site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                  Les liens vers ces autres ressources vous font quitter le site de Loucman Machababy. 
                  Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Droit applicable</h2>
                <p className="text-muted-foreground">
                  Tout litige en relation avec l'utilisation du site est soumis au droit français. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


