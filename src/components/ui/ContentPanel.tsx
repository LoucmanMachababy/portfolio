"use client";

import Link from "next/link";
import { profile } from "@/content/bio";
import { experienceSalomon, publicProjects, skills } from "@/content/projects";
import type { TableId } from "@/content/tables";

type Props = {
  tableId: TableId;
  onClose: () => void;
};

export function ContentPanel({ tableId, onClose }: Props) {
  return (
    <aside
      className="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div className="panel__header">
        <p className="panel__eyebrow">Volet matos ultra · Virage Auteuil</p>
        <button type="button" className="panel__close" onClick={onClose} aria-label="Fermer">
          Fermer · Esc
        </button>
      </div>
      <div className="panel__body">{renderContent(tableId)}</div>
    </aside>
  );
}

function renderContent(id: TableId) {
  switch (id) {
    case "identite":
      return (
        <article>
          <h2 id="panel-title">{profile.name}</h2>
          <p className="panel__role">{profile.role}</p>
          <p>{profile.tagline}</p>
          <p>{profile.bio}</p>
          <h3>Parcours</h3>
          <ul className="panel__list">
            {profile.parcours.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span className="panel__meta">{item.period}</span>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </article>
      );
    case "projets":
      return (
        <article>
          <h2 id="panel-title">Maillots collectés — projets vitrine</h2>
          <p>
            Trois travaux publics uniquement : pas de dump de tous les repos école ici.
          </p>
          <ul className="panel__cards">
            {publicProjects.map((project) => (
              <li key={project.id}>
                <h3>{project.name}</h3>
                <p className="panel__meta">{project.status}</p>
                <p>{project.summary}</p>
                <p className="panel__tags">{project.stack.join(" · ")}</p>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    Voir le site
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </article>
      );
    case "competences":
      return (
        <article>
          <h2 id="panel-title">Plan du match — stack</h2>
          <p>Compétences techniques condensées, côté terrain.</p>
          <div className="panel__skills">
            {skills.map((group) => (
              <section key={group.group}>
                <h3>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      );
    case "salomon":
      return (
        <article>
          <h2 id="panel-title">{experienceSalomon.title}</h2>
          <p className="panel__meta">{experienceSalomon.period}</p>
          <ul className="panel__list">
            {experienceSalomon.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      );
    case "contact":
      return (
        <article>
          <h2 id="panel-title">Buvette — contact</h2>
          <ul className="panel__list">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.cvPath} download>
                Télécharger le CV (PDF)
              </a>
            </li>
          </ul>
          <h3>Formulaire rapide</h3>
          <ContactForm />
        </article>
      );
    case "staff":
      return (
        <article>
          <h2 id="panel-title">Feuille de match — staff</h2>
          <p>
            Zone pédagogique RNCP31899 (auto-évaluation + preuves). Accès réservé à
            l&apos;équipe / jury via mot de passe.
          </p>
          <Link className="panel__cta" href="/staff">
            Entrer dans /staff
          </Link>
        </article>
      );
    default:
      return null;
  }
}

function ContactForm() {
  const subject = encodeURIComponent("Contact portfolio — Loucman Machababy");
  return (
    <form
      className="contact-form"
      action={`mailto:${profile.email}?subject=${subject}`}
      method="post"
      encType="text/plain"
    >
      <label>
        Nom
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      <button type="submit">Envoyer via e-mail</button>
      <p className="panel__meta">
        Stub mailto pour l&apos;instant — API contact à brancher plus tard.
      </p>
    </form>
  );
}
