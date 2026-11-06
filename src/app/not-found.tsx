import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <h1>404 — hors stade</h1>
      <p>Cette page n&apos;existe pas dans la coursive.</p>
      <p>
        <Link href="/">Retour à l&apos;expérience</Link> · <Link href="/fallback">Version 2D</Link>
      </p>
    </main>
  );
}
