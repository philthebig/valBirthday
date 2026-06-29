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
}

export function MemoryCollage({ stops, photos }: MemoryCollageProps) {
  const [generating, setGenerating] = useState<'idle' | 'image' | 'pdf'>('idle');
  const [status, setStatus] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    goldBurst();
    const t = setTimeout(goldBurst, 800);
    return () => clearTimeout(t);
  }, []);

  const missingCount = stops.filter((s) => !getPhoto(photos, s.order)).length;
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
      if (result === 'shared') {
        setStatus('Album partagé — enregistre-le dans tes photos!');
      } else if (result === 'downloaded') {
        setStatus('Image téléchargée!');
      }
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85));
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
      const { downloadPdfFromCanvas: savePdf } = await import('../utils/downloadAlbum');
      await savePdf(canvas, `${baseName}.pdf`);
      setStatus('PDF téléchargé!');
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85));
    } catch {
      setStatus('Erreur lors du PDF. Réessaie.');
    } finally {
      setGenerating('idle');
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
          {missingCount} photo{missingCount > 1 ? 's' : ''} manquante{missingCount > 1 ? 's' : ''} —
          l&apos;album utilisera des emplacements vides.
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

      {previewUrl && (
        <div className="memory-collage__preview-wrap">
          <p className="memory-collage__preview-label">Aperçu de ton album</p>
          <img src={previewUrl} alt="Aperçu album généré" className="memory-collage__preview" />
        </div>
      )}

      <div className="memory-collage__finale">
        <p className="memory-collage__message">{config.finalTreasure.message}</p>
        <p className="memory-collage__surprise">{config.finalTreasure.surpriseHint}</p>
      </div>

      <button
        type="button"
        className="btn btn--primary memory-collage__save"
        onClick={handleGenerateImage}
        disabled={generating !== 'idle'}
      >
        {generating === 'image' ? 'Création en cours…' : 'Sauvegarder ton Album Souvenir (Image)'}
      </button>

      <button
        type="button"
        className="btn btn--ghost memory-collage__save-pdf"
        onClick={handleGeneratePdf}
        disabled={generating !== 'idle'}
      >
        {generating === 'pdf' ? 'Création du PDF…' : 'Télécharger en PDF'}
      </button>

      {status && (
        <p className="memory-collage__status" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
