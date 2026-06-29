import { useEffect, useRef, useState } from 'react';
import { burstConfetti } from '../utils/confetti';
import { fileToBase64 } from '../utils/imageToBase64';

interface PhotoCaptureProps {
  enigmeNumber: number;
  instruction: string;
  existingPreview?: string | null;
  onConfirm: (base64: string) => void;
}

export function PhotoCapture({
  enigmeNumber,
  instruction,
  existingPreview,
  onConfirm,
}: PhotoCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingPreview ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    burstConfetti();
  }, []);

  const handleFile = async (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Choisis une image valide.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const base64 = await fileToBase64(file);
      setPreview(base64);
    } catch {
      setError('Impossible de charger la photo. Réessaie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stop-card stop-card--photo">
      <p className="stop-card__mystery-label">Énigme {enigmeNumber}</p>
      <h3 className="stop-card__photo-title">Énigme Résolue ! 🎉</h3>

      <p className="stop-card__photo-instruction">{instruction}</p>

      <div className="photo-upload">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="photo-upload__input"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          className="photo-upload__zone"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          {preview ? (
            <img src={preview} alt="Aperçu de ton souvenir" className="photo-upload__preview" />
          ) : (
            <>
              <span className="photo-upload__icon" aria-hidden="true">
                📷
              </span>
              <span className="photo-upload__label">
                Cliquez pour ouvrir la caméra / téléverser une photo
              </span>
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="stop-card__error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="btn btn--primary"
        style={{ width: '100%', marginTop: '1rem' }}
        disabled={!preview || loading}
        onClick={() => preview && onConfirm(preview)}
      >
        Confirmer la Photo & Débloquer Trésor Suivant →
      </button>
    </div>
  );
}
