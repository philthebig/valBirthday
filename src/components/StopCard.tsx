import { useState } from 'react';
import type { HuntStop } from '../data/hunt';
import { matchesAnswer } from '../utils/normalize';

interface StopCardProps {
  stop: HuntStop;
  completed: boolean;
  onComplete: (stop: HuntStop) => void;
  onContinue?: () => void;
  awaitingContinue?: boolean;
}

export function StopCard({ stop, completed, onComplete, onContinue, awaitingContinue }: StopCardProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [showFunFact, setShowFunFact] = useState(completed || awaitingContinue);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchesAnswer(answer, stop.answers)) {
      setError('');
      onComplete(stop);
      setShowFunFact(true);
    } else {
      setError('Pas tout à fait… regarde autour de toi et réessaie! 🔍');
    }
  };

  if (completed && showFunFact) {
    return (
      <div className="stop-card stop-card--done">
        <div className="stop-card__header">
          <span className="stop-card__emoji" aria-hidden="true">
            {stop.emoji}
          </span>
          <div>
            <h3 className="stop-card__title">{stop.name}</h3>
            <p className="stop-card__badge">✓ Découvert!</p>
          </div>
        </div>
        <p className="stop-card__celebration">{stop.celebration}</p>
        <p className="stop-card__fun-fact">
          <strong>Le savais-tu?</strong> {stop.funFact}
        </p>
        {onContinue && (
          <button type="button" className="btn btn--primary" onClick={onContinue} style={{ marginTop: '1rem', width: '100%' }}>
            Étape suivante →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="stop-card">
      <div className="stop-card__header">
        <span className="stop-card__number">Étape {stop.order}</span>
        {stop.scheduledTime && (
          <span className="stop-card__time">🕐 {stop.scheduledTime}</span>
        )}
        {stop.flexibleTime && (
          <span className="stop-card__time stop-card__time--flex">🚗 {stop.flexibleTime}</span>
        )}
        <span className="stop-card__emoji" aria-hidden="true">
          {stop.emoji}
        </span>
      </div>
      <h3 className="stop-card__title">{stop.name}</h3>
      <p className="stop-card__clue">{stop.clue}</p>

      {stop.babyTip && (
        <p className="stop-card__baby-tip">
          <strong>👶 Avec Émile:</strong> {stop.babyTip}
        </p>
      )}

      {showHint && (
        <p className="stop-card__hint">
          <strong>Indice:</strong> {stop.hint}
        </p>
      )}

      <div className="stop-card__actions-row">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setShowHint(true)}>
          {showHint ? '💡 Indice révélé' : '💡 Besoin d\'un indice?'}
        </button>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
          📍 Ouvrir dans Maps
        </a>
      </div>

      <form onSubmit={handleSubmit} className="stop-card__form">
        <label htmlFor={`answer-${stop.id}`} className="stop-card__label">
          Quand tu es sur place, entre le nom du lieu (ou un mot-clé):
        </label>
        <input
          id={`answer-${stop.id}`}
          type="text"
          className="stop-card__input"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
          placeholder="Ton indice secret…"
          autoComplete="off"
          autoCapitalize="off"
        />
        {error && <p className="stop-card__error" role="alert">{error}</p>}
        <button type="submit" className="btn btn--primary" disabled={!answer.trim()}>
          J'ai trouvé! 🎯
        </button>
      </form>
    </div>
  );
}
