import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/bio";
import { experienceSalomon, publicProjects, skills } from "@/content/projects";

export const metadata: Metadata = {
  title: "Version 2D accessible | Loucman Machababy",
  description:
    "Fallback plat et accessible du portfolio de Loucman Machababy — même contenu que l'expérience Auteuil.",
};

export default function FallbackPage() {
  return (
    <main className="page page--fallback">
      <header className="fallback-hero">
        <p className="fallback-hero__place">Version 2D · accessible</p>
        <h1>{profile.name}</h1>
        <p className="fallback-hero__role">{profile.role}</p>
        <p>{profile.tagline}</p>
        <nav aria-label="Actions">
          <Link href="/">Expérience 3D</Link>
          <a href={profile.cvPath} download>
            CV PDF
          </a>
          <Link href="/staff">Staff RNCP</Link>
        </nav>
      </header>

      <section aria-labelledby="bio-title">
        <h2 id="bio-title">Identité</h2>
        <p>{profile.bio}</p>
        <ul>
          {profile.parcours.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong> — {p.period}
              <br />
              {p.detail}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="projects-title">
        <h2 id="projects-title">Projets vitrine</h2>
        {publicProjects.map((project) => (
          <article key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.status}</p>
            <p>{project.summary}</p>
            <p>{project.stack.join(", ")}</p>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.url}
              </a>
            ) : null}
          </article>
        ))}
      </section>

      <section aria-labelledby="skills-title">
        <h2 id="skills-title">Compétences</h2>
        {skills.map((g) => (
          <div key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="salomon-title">
        <h2 id="salomon-title">{experienceSalomon.title}</h2>
        <p>{experienceSalomon.period}</p>
        <ul>
          {experienceSalomon.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <ul>
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
        </ul>
        <form
          action={`mailto:${profile.email}?subject=${encodeURIComponent("Contact portfolio")}`}
          method="post"
          encType="text/plain"
        >
          <label>
            Nom
            <input name="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </main>
  );
}
