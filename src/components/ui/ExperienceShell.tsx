"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ContentPanel } from "./ContentPanel";
import { NavMenu } from "./NavMenu";
import { standTables, type TableId } from "@/content/tables";
import { profile } from "@/content/bio";

const AuteuilScene = dynamic(
  () => import("../scene/AuteuilScene").then((m) => m.AuteuilScene),
  { ssr: false, loading: () => <div className="scene-loading">Chargement de la coursive…</div> },
);

export function ExperienceShell() {
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTable, setActiveTable] = useState<TableId | null>(null);
  const [nearby, setNearby] = useState<TableId | null>(null);
  const [prefer2d, setPrefer2d] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 720px)").matches;
    setPrefer2d(coarse || narrow);
  }, []);

  const panelOpen = activeTable !== null;

  const openTable = useCallback((id: TableId) => {
    setActiveTable(id);
    setMenuOpen(false);
  }, []);

  const closePanel = useCallback(() => setActiveTable(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        if (panelOpen) closePanel();
        else setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, closePanel]);

  return (
    <div className="experience">
      <a className="skip-link" href="/fallback">
        Aller à la version 2D accessible
      </a>

      <NavMenu
        open={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        onNavigateTable={openTable}
      />

      <div className="experience__stage" aria-hidden={panelOpen}>
        <AuteuilScene
          activeTable={activeTable}
          panelOpen={panelOpen || !started}
          controlsEnabled={started}
          onOpenTable={openTable}
          onNearbyChange={setNearby}
        />
      </div>

      {!started && (
        <div className="welcome">
          <div className="welcome__inner">
            <p className="welcome__place">Parc des Princes · Virage Auteuil</p>
            <h1 className="welcome__brand">{profile.name}</h1>
            <p className="welcome__lead">
              {profile.role}. Marche dans la coursive Auteuil — volets jaunes, fluos,
              graffs — et lève un rideau pour ouvrir le portfolio.
            </p>
            <div className="welcome__actions">
              <button
                id="enter-auteuil"
                type="button"
                className="welcome__cta"
                onClick={() => setStarted(true)}
              >
                Entrer dans la coursive
              </button>
              <a
                className={prefer2d ? "welcome__cta welcome__cta--ghost" : "welcome__secondary"}
                href="/fallback"
              >
                {prefer2d ? "Recommandé : version 2D" : "Version 2D"}
              </a>
            </div>
            <p className="welcome__help">
              {prefer2d
                ? "Sur mobile, la version 2D est plus confortable. La 3D reste cliquable via le menu."
                : "ZQSD / WASD · souris pour regarder · E près d'une table · Esc pour fermer"}
            </p>
          </div>
        </div>
      )}

      {started && !panelOpen && (
        <div className="hud" aria-live="polite">
          <p>
            {nearby
              ? `Près de « ${standTables.find((t) => t.id === nearby)?.title ?? nearby} » — appuie sur E`
              : "Explore la coursive · Menu toujours dispo"}
          </p>
        </div>
      )}

      {activeTable && <ContentPanel tableId={activeTable} onClose={closePanel} />}
    </div>
  );
}
