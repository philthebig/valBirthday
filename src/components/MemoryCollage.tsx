import { useState } from 'react';
import { config } from '../config';
import type { HuntStop } from '../data/hunt';
import { getPhoto, type PhotoMap } from '../utils/photoStorage';
import { downloadPdfFromCanvas, shareOrDownloadImage } from '../utils/downloadAlbum';
import { canvasToJpegBlob, generateAlbumImage } from '../utils/generateAlbumImage';
import { goldBurst } from '../utils/confetti';
import { useEffect } from 'react';

interface MemoryCollageProps {
  stops: HuntStop[];
  photos: PhotoMap;
  onReplay?: () => void;
}

export function MemoryCollage({ stops, photos, onReplay }: MemoryCollageProps) {
  const [generating, setGenerating] = useState<'idle' | 'image' | 'pdf'>('idle');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    goldBurst();
    const t = setTimeout(goldBurst, 800);
    return () => clearTimeout(t);
  }, []);

  const dateSlug = new Date().toISOString().slice(0, 10);
  const baseName = `album-souvenir-${config.recipientName.toLowerCase()}-tremblant-${dateSlug}`;

  const handleGenerateImage = async () => {
    setGenerating('image');
    setStatus(null);
    try {
      const canvas = await generateAlbumImage(stops, photos);
      const blob = await canvasToJpegBlob(canvas);
      const result = await shareOrDownloadImage(
        blob,
        `${baseName}.jpg`,
        `Album Souvenir — ${config.recipientName}`,
      );
      if (result === 'shared') setStatus('Album partagé — enregistre-le dans tes photos!');
      else if (result === 'downloaded') setStatus('Image téléchargée!');
    } catch {
      setStatus('Erreur lors de la création. Réessaie.');
    } finally {
      setGenerating('idle');
    }
  };

  const handleGeneratePdf = async () => {
    setGenerating('pdf');
    setStatus(null);
    try {
      const canvas = await generateAlbumImage(stops, photos);
      await downloadPdfFromCanvas(canvas, `${baseName}.pdf`);
      setStatus('PDF téléchargé!');
    } catch {
      setStatus('Erreur lors du PDF. Réessaie.');
    } finally {
      setGenerating('idle');
    }
  };

  return (
    <div className="memory-collage">
      <header className="memory-collage__header">
        <h2 className="memory-collage__title">
          Joyeux Anniversaire {config.recipientName} ! 💛
        </h2>
        <p className="memory-collage__subtitle">
          Voici les souvenirs de ta journée à Tremblant :
        </p>
      </header>

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
              <figcaption className="memory-collage__caption">{stop.name}</figcaption>
            </figure>
          );
        })}
      </div>

      <p className="memory-collage__conclusion">
        {config.finalTreasure.message}
      </p>

      {onReplay && (
        <button type="button" className="btn btn--primary memory-collage__replay" onClick={onReplay}>
          Revivre la journée
        </button>
      )}

      <div className="memory-collage__export">
        <button
          type="button"
          className="btn btn--ghost memory-collage__export-btn"
          onClick={handleGenerateImage}
          disabled={generating !== 'idle'}
        >
          {generating === 'image' ? 'Création…' : 'Sauvegarder l\'album (image)'}
        </button>
        <button
          type="button"
          className="btn btn--ghost memory-collage__export-btn"
          onClick={handleGeneratePdf}
          disabled={generating !== 'idle'}
        >
          {generating === 'pdf' ? 'Création…' : 'Télécharger en PDF'}
        </button>
      </div>

      {status && (
        <p className="memory-collage__status" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
