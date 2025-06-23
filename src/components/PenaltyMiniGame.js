import React, { useRef, useState } from 'react';
import ConfettiEffect from './ConfettiEffect';
import useSound from 'use-sound';

const GOAL_ZONE = { x: 120, width: 60 }; // zone de but au centre
const BALL_START = { x: 150, y: 320 };
const GOAL_LINE = 60;

const PenaltyMiniGame = ({ onBack }) => {
  const [ball, setBall] = useState({ ...BALL_START });
  const [shooting, setShooting] = useState(false);
  const [goal, setGoal] = useState(null); // null, true, false
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playKick] = useSound('/sounds/var_bip.mp3', { volume: 0.5 });
  const [playGoal] = useSound('/sounds/var_verdict.mp3', { volume: 0.7 });
  const [playMiss] = useSound('/sounds/var_scan.mp3', { volume: 0.5 });
  const canvasRef = useRef();

  const handleShoot = (e) => {
    if (shooting) return;
    setShooting(true);
    setGoal(null);
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    playKick();
    // Animation du tir
    let y = BALL_START.y;
    let x = BALL_START.x;
    const dx = (mouseX - x) / 30;
    const interval = setInterval(() => {
      y -= 8;
      x += dx;
      setBall({ x, y });
      if (y <= GOAL_LINE) {
        clearInterval(interval);
        // Vérifie si c'est un but
        if (x > GOAL_ZONE.x && x < GOAL_ZONE.x + GOAL_ZONE.width) {
          setGoal(true);
          setScore(s => s + 1);
          playGoal();
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        } else {
          setGoal(false);
          playMiss();
        }
        setTimeout(() => {
          setBall({ ...BALL_START });
          setShooting(false);
        }, 1200);
      }
    }, 16);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'radial-gradient(ellipse at 50% 80%, #3bb143 60%, #1a1a2e 100%)',
      zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <button onClick={onBack} style={{ position: 'absolute', top: 30, left: 30, zIndex: 2, fontSize: 18, padding: '0.5rem 1.2rem', borderRadius: 16, border: 'none', background: 'rgba(255,215,0,0.85)', color: '#222', fontWeight: 700, boxShadow: '0 2px 16px #ffd70088', cursor: 'pointer', backdropFilter: 'blur(2px)', transition: 'background 0.2s', outline: '2px solid #fff', outlineOffset: '-4px' }}>↩ Retour</button>
      <h2 style={{ color: '#ffd700', fontSize: '2.2rem', margin: '1rem 0 0.5rem', textShadow: '0 0 10px #ffd700, 0 0 30px #fff' }}>Mini-jeu Penalty</h2>
      <div style={{ color: '#fff', marginBottom: 10, fontSize: 20, letterSpacing: 1 }}>Score : <span style={{ color: '#ffd700', fontWeight: 700 }}>{score}</span></div>
      <div style={{ marginBottom: 18, textAlign: 'center' }}>
        <span style={{ background: 'rgba(34,34,34,0.85)', color: '#ffd700', fontWeight: 600, fontSize: 15, borderRadius: 10, padding: '0.3rem 1rem', boxShadow: '0 2px 8px #ffd70033', border: '1.2px solid #ffd700', letterSpacing: 1, textShadow: '0 0 6px #ffd700', opacity: 0.85 }}>
          Clique dans le but pour tirer !
        </span>
      </div>
      <div style={{ position: 'relative', width: 330, height: 350, background: 'rgba(34,34,34,0.95)', borderRadius: 30, boxShadow: '0 0 40px #ffd70099, 0 0 0 8px #fff2 inset', overflow: 'hidden', border: '4px solid #ffd700', marginBottom: 20 }}>
        {/* Pelouse */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 120, background: 'repeating-linear-gradient(90deg, #3bb143 0 20px, #2e8b57 20px 40px)', opacity: 0.25, zIndex: 0 }} />
        <svg ref={canvasRef} width={330} height={350} style={{ display: 'block', cursor: shooting ? 'not-allowed' : 'crosshair', zIndex: 1 }} onClick={handleShoot}>
          {/* Ombre du but */}
          <ellipse cx={165} cy={70} rx={70} ry={12} fill="#000" opacity={0.18} />
          {/* But 3D */}
          <rect x={100} y={30} width={130} height={30} fill="#fff" stroke="#00eaff" strokeWidth={6} rx={12} style={{ filter: 'drop-shadow(0 4px 12px #00eaff88)' }} />
          {/* Zone de but glow */}
          <rect x={GOAL_ZONE.x} y={30} width={GOAL_ZONE.width} height={30} fill="#ffd70055" stroke="#ffd700" strokeWidth={3} rx={10} style={{ filter: 'drop-shadow(0 0 16px #ffd700)' }} />
          {/* Filet */}
          {[...Array(6)].map((_, i) => <line key={i} x1={100 + i*22} y1={30} x2={100 + i*22} y2={60} stroke="#bbb" strokeWidth={1} opacity={0.7} />)}
          {[...Array(3)].map((_, i) => <line key={i} x1={100} y1={30 + i*10} x2={230} y2={30 + i*10} stroke="#bbb" strokeWidth={1} opacity={0.7} />)}
          {/* Ballon stylisé */}
          <ellipse cx={ball.x} cy={ball.y+8} rx={16} ry={7} fill="#000" opacity={0.18} />
          <circle cx={ball.x} cy={ball.y} r={16} fill="url(#ballGradient)" stroke="#222" strokeWidth={3} />
          <circle cx={ball.x} cy={ball.y} r={7} fill="#222" stroke="#fff" strokeWidth={2} />
          <defs>
            <radialGradient id="ballGradient" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="80%" stopColor="#e2e2e2" />
              <stop offset="100%" stopColor="#bbb" />
            </radialGradient>
          </defs>
          {/* Message de résultat animé */}
          {goal === true && <text x={165} y={120} textAnchor="middle" fill="#ffd700" fontSize={38} fontWeight={900} style={{ textShadow: '0 0 18px #ffd700, 0 0 40px #fff', animation: 'goal-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55) both' }}>GOAL !</text>}
          {goal === false && <text x={165} y={120} textAnchor="middle" fill="#00eaff" fontSize={32} fontWeight={900} style={{ textShadow: '0 0 10px #00eaff, 0 0 30px #fff', animation: 'goal-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55) both' }}>RATÉ !</text>}
        </svg>
      </div>
      {showConfetti && <ConfettiEffect />}
      {/* Animation CSS pour le texte GOAL */}
      <style>{`
        @keyframes goal-pop {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.2) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default PenaltyMiniGame; 