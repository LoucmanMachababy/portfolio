"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function StaffGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Accès refusé.");
        return;
      }
      router.refresh();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="staff-gate" onSubmit={onSubmit}>
      <h1>Zone staff — RNCP31899</h1>
      <p>
        Accès pédagogique réservé (jury / équipe). Le public reste sur la coursive Auteuil.
      </p>
      <label>
        Mot de passe
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error ? <p className="staff-gate__error" role="alert">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}
