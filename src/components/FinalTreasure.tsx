import { config } from '../config';
import { goldBurst } from '../utils/confetti';
import { useEffect } from 'react';

export function FinalTreasure() {
  useEffect(() => {
    goldBurst();
    const t = setTimeout(goldBurst, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="final-treasure">
      <div className="final-treasure__glow" aria-hidden="true" />
      <p className="final-treasure__eyebrow">Chasse terminée!</p>
      <h2 className="final-treasure__title">{config.finalTreasure.title}</h2>
      <p className="final-treasure__message">{config.finalTreasure.message}</p>
      <div className="final-treasure__surprise">
        <span className="final-treasure__gift" aria-hidden="true">
          🎁
        </span>
        <p>{config.finalTreasure.surpriseHint}</p>
      </div>
      <p className="final-treasure__hearts" aria-hidden="true">
        💛 🏔️ 💛
      </p>
    </div>
  );
}
