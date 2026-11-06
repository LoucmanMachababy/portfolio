import Link from "next/link";
import { rncpBlocks } from "@/content/rncp";

export function RncpBlocks() {
  return (
    <div className="rncp">
      <header className="rncp__header">
        <p className="rncp__eyebrow">Référentiel RNCP31899</p>
        <h1>Feuille de match — compétences</h1>
        <p>
          Auto-évaluation (1–5) et preuves publiques. Les détails internes Salomon restent
          non publiés ; les repos école sont pointés via GitHub.
        </p>
        <Link href="/">← Retour coursive</Link>
      </header>

      <ol className="rncp__list">
        {rncpBlocks.map((block) => (
          <li key={block.id} className="rncp__card">
            <div className="rncp__card-top">
              <span className="rncp__code">{block.code}</span>
              <span
                className="rncp__score"
                aria-label={`Auto-évaluation ${block.selfAssessment} sur 5`}
              >
                {block.selfAssessment}/5
              </span>
            </div>
            <h2>{block.title}</h2>
            <p>{block.summary}</p>
            <h3>Preuves</h3>
            <ul>
              {block.proofs.map((proof) => (
                <li key={proof.href + proof.label}>
                  <a href={proof.href} target="_blank" rel="noopener noreferrer">
                    {proof.label}
                  </a>
                  {proof.note ? <span className="rncp__note"> — {proof.note}</span> : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
