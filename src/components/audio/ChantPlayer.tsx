"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHANT_PLAYLIST, chantBeat } from "@/lib/chants";

type Props = {
  /** Démarre la playlist (après « Entrer ») */
  active: boolean;
};

/**
 * Playlist tournante près du cortège (HTML Audio + analyse basse).
 * Mute via bouton UI. Beat clair → chantBeat.hasClearBeat pour le batteur.
 */
export function ChantPlayer({ active }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const idxRef = useRef(0);
  const rafRef = useRef(0);
  const [muted, setMuted] = useState(false);
  const [title, setTitle] = useState(CHANT_PLAYLIST[0].title);

  const loadIndex = useCallback((i: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = CHANT_PLAYLIST[i % CHANT_PLAYLIST.length];
    idxRef.current = i % CHANT_PLAYLIST.length;
    setTitle(track.title);
    audio.src = `/audio/chants/${track.file}`;
    audio.load();
  }, []);

  const ensureGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      analyserRef.current = analyser;
      try {
        const src = ctx.createMediaElementSource(audio);
        sourceRef.current = src;
        src.connect(analyser);
        analyser.connect(ctx.destination);
      } catch {
        // source déjà connectée (HMR)
      }
    }
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "metadata";
    audio.volume = 0.42;
    audioRef.current = audio;
    loadIndex(0);

    const onEnded = () => {
      loadIndex(idxRef.current + 1);
      void audio.play().catch(() => undefined);
    };
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      cancelAnimationFrame(rafRef.current);
      void ctxRef.current?.close();
      ctxRef.current = null;
      audioRef.current = null;
    };
  }, [loadIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!active) {
      audio.pause();
      chantBeat.energy = 0;
      chantBeat.hasClearBeat = false;
      chantBeat.pulse = 0;
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let cancelled = false;
    void (async () => {
      await ensureGraph();
      if (cancelled) return;
      try {
        await audio.play();
      } catch {
        // autoplay bloqué jusqu'à interaction — le CTA « Entrer » compte
      }

      const data = new Uint8Array(analyserRef.current?.frequencyBinCount ?? 0);
      let prevEnergy = 0;

      const tick = () => {
        rafRef.current = requestAnimationFrame(tick);
        const analyser = analyserRef.current;
        if (!analyser || audio.paused) return;
        analyser.getByteFrequencyData(data);
        // Basses ~ bins 1–6
        let sum = 0;
        const n = Math.min(6, data.length);
        for (let i = 1; i < n; i++) sum += data[i];
        const energy = n > 1 ? sum / ((n - 1) * 255) : 0;
        const delta = energy - prevEnergy;
        prevEnergy = energy * 0.85 + prevEnergy * 0.15;

        // Rythme clair = énergie basse soutenue + attaques
        const clear = energy > 0.22 && (delta > 0.04 || energy > 0.38);
        chantBeat.energy = energy;
        chantBeat.hasClearBeat = clear;
        if (clear && delta > 0.035) {
          chantBeat.pulse = 1;
        } else {
          chantBeat.pulse = Math.max(0, chantBeat.pulse - 0.08);
        }
      };
      tick();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, ensureGraph]);

  const skip = () => {
    loadIndex(idxRef.current + 1);
    void audioRef.current?.play().catch(() => undefined);
  };

  if (!active) return null;

  return (
    <div className="chant-player" role="region" aria-label="Chants du cortège">
      <button
        type="button"
        className="chant-player__btn"
        onClick={() => setMuted((m) => !m)}
        aria-pressed={muted}
        title={muted ? "Activer le son" : "Couper le son"}
      >
        {muted ? "🔇 Chants" : "🔊 Chants"}
      </button>
      <span className="chant-player__title">{title}</span>
      <button type="button" className="chant-player__btn chant-player__btn--ghost" onClick={skip}>
        Suivant
      </button>
    </div>
  );
}
