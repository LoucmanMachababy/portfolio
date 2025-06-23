'use client';

import useSound from 'use-sound';
import { useSound as useSoundContext } from '../contexts/SoundContext';

const useSoundEffects = () => {
  const { isMuted } = useSoundContext();

  // Le volume est ajusté pour que les sons ne soient pas trop forts
  const [playClick] = useSound('/sounds/click.mp3', { volume: isMuted ? 0 : 0.6 });
  const [playSwoosh] = useSound('/sounds/swoosh.mp3', { volume: isMuted ? 0 : 0.4 });

  return { playClick, playSwoosh };
};

export default useSoundEffects; 