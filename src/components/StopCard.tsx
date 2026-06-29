import { useEffect, useRef, useState } from 'react';
import type { HuntStop } from '../data/hunt';
import { burstConfetti } from '../utils/confetti';
import { fileToBase64 } from '../utils/imageToBase64';
import { matchesAnswer } from '../utils/normalize';

type StopPhase = 'mystery' | 'photo';

interface StopCardProps {
  stop: HuntStop;
  phase: StopPhase;
  onGuessCorrect: (stop: HuntStop) => void;
  onPhotoConfirm: (base64: string) => Promise<boolean>;
  existingPhoto?: string | null;
}

export function StopCard({
  stop,
  phase,
  onGuessCorrect,
  onPhotoConfirm,
  existingPhoto,
}: StopCardProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(existingPhoto ?? null);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'photo') {
      burstConfetti();
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchesAnswer(answer, stop.answers)) {
      setError('');
      onGuessCorrect(stop);
    } else {
      setError('Pas tout à fait… réfléchis encore un peu! 🤔');
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Choisis une image valide.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const base64 = await fileToBase64(file);
      setPreview(base64);
    } catch {
      setError('Impossible de charger la photo. Réessaie.');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmPhoto = async () => {
    if (!preview) return;
    setSaving(true);
    setError('');
    const ok = await onPhotoConfirm(preview);
    setSaving(false);
    if (!ok) {
      setError('Impossible de sauvegarder la photo. Réessaie ou réinitialise la progression.');
    }
  };

  if (phase === 'photo') {
    return (
      <div className="stop-card stop-card--photo">
        <p className="stop-card__mystery-label">Énigme {stop.order}</p>
        <h3 className="stop-card__photo-title">Énigme Résolue ! 🎉</h3>

        <p className="stop-card__photo-instruction">{stop.photoInstruction}</p>

        <div className="photo-upload">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="photo-upload__input"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            className="photo-upload__zone"
            onClick={() => fileRef.current?.click()}
            disabled={saving}
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
          disabled={!preview || saving}
          onClick={handleConfirmPhoto}
        >
          {saving ? 'Sauvegarde…' : 'Confirmer la photo et continuer'}
        </button>
      </div>
    );
  }

  return (
    <div className="stop-card stop-card--mystery">
      <div className="stop-card__mystery-badge" aria-hidden="true">
        ❓
      </div>
      <p className="stop-card__mystery-label">Énigme {stop.order}</p>
      <h3 className="stop-card__mystery-title">Où allons-nous?</h3>
      <p className="stop-card__clue">{stop.clue}</p>

      {showHint && (
        <p className="stop-card__hint">
          <strong>Indice:</strong> {stop.hint}
        </p>
      )}

      <div className="stop-card__actions-row">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setShowHint(true)}>
          {showHint ? '💡 Indice révélé' : '💡 Un petit indice?'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="stop-card__form">
        <label htmlFor={`answer-${stop.id}`} className="stop-card__label">
          Devine la destination (un mot ou une expression):
        </label>
        <input
          ref={inputRef}
          id={`answer-${stop.id}`}
          type="text"
          className="stop-card__input"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
          placeholder="Ta devinette…"
          autoComplete="off"
          autoCapitalize="off"
        />
        {error && (
          <p className="stop-card__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--primary" disabled={!answer.trim()}>
          J&apos;ai deviné! 🎯
        </button>
      </form>
    </div>
  );
}
