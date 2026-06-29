import { config } from '../config';
import type { HuntStop } from '../data/hunt';
import { getPhoto, type PhotoMap } from '../utils/photoStorage';
import { goldBurst } from '../utils/confetti';
import { useEffect } from 'react';

interface MemoryCollageProps {
  stops: HuntStop[];
  photos: PhotoMap;
  onSaveAlbum?: () => void;
}

export function MemoryCollage({ stops, photos, onSaveAlbum }: MemoryCollageProps) {
  useEffect(() => {
    goldBurst();
    const t = setTimeout(goldBurst, 800);
    return () => clearTimeout(t);
  }, []);

  const missingCount = stops.filter((s) => !getPhoto(photos, s.order)).length;

  const handleSave = () => {
    if (onSaveAlbum) {
      onSaveAlbum();
    } else {
      window.alert(
        'Bientôt disponible — tu pourras sauvegarder ton album souvenir en image ou PDF! 💛',
      );
    }
  };

  return (
    <div className="memory-collage">
      <header className="memory-collage__header">
        <h2 className="memory-collage__title">Joyeux Anniversaire {config.recipientName} ! 🎉</h2>
        <p className="memory-collage__eyebrow">{config.huntTitle}</p>
        <p className="memory-collage__subtitle">Pour {config.recipientName} 💛</p>
      </header>

      {missingCount > 0 && (
        <p className="memory-collage__missing" role="status">
          {missingCount} photo{missingCount > 1 ? 's' : ''} manquante{missingCount > 1 ? 's' : ''}.
          Réinitialise la progression pour recommencer avec les souvenirs.
        </p>
      )}

      <div className="memory-collage__grid">
        {stops.map((stop) => {
          const src = getPhoto(photos, stop.order);
          return (
            <figure key={stop.id} className="memory-collage__item">
              <div className="memory-collage__frame">
                {src ? (
                  <img src={src} alt={`Souvenir — ${stop.name}`} className="memory-collage__img" />
                ) : (
                  <div className="memory-collage__placeholder">{stop.emoji}</div>
                )}
              </div>
              <figcaption className="memory-collage__caption">
                Stop {stop.order}: {stop.name}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="memory-collage__finale">
        <p className="memory-collage__message">{config.finalTreasure.message}</p>
        <p className="memory-collage__surprise">{config.finalTreasure.surpriseHint}</p>
      </div>

      <button type="button" className="btn btn--primary memory-collage__save" onClick={handleSave}>
        Sauvegarder ton Album Souvenir (Générer une image / PDF)
      </button>
    </div>
  );
}
