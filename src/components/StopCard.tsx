import { useState } from 'react';
import type { HuntStop } from '../data/hunt';
import { matchesAnswer } from '../utils/normalize';

interface StopCardProps {
  stop: HuntStop;
  totalStops: number;
  phase: 'mystery' | 'revealed';
  onGuessCorrect: (stop: HuntStop) => void;
  onContinue?: () => void;
}

export function StopCard({ stop, totalStops, phase, onGuessCorrect, onContinue }: StopCardProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchesAnswer(answer, stop.answers)) {
      setError('');
      onGuessCorrect(stop);
    } else {
      setError('Pas tout à fait… réfléchis encore un peu! 🤔');
    }
  };

  if (phase === 'revealed') {
    return (
      <div className="stop-card stop-card--revealed">
        <p className="stop-card__reveal-eyebrow">✨ C'est parti pour…</p>
        <div className="stop-card__header">
          <span className="stop-card__emoji stop-card__emoji--big" aria-hidden="true">
            {stop.emoji}
          </span>
          <div>
            <h3 className="stop-card__title">{stop.name}</h3>
            {stop.scheduledTime && (
              <p className="stop-card__badge">🕐 {stop.scheduledTime}</p>
            )}
            {stop.flexibleTime && (
              <p className="stop-card__badge stop-card__badge--flex">{stop.flexibleTime}</p>
            )}
          </div>
        </div>
        <p className="stop-card__celebration">{stop.celebration}</p>
        {stop.babyTip && (
          <p className="stop-card__baby-tip">
            <strong>👶 Avec Émile:</strong> {stop.babyTip}
          </p>
        )}
        <p className="stop-card__fun-fact">
          <strong>Le savais-tu?</strong> {stop.funFact}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
          style={{ width: '100%', marginBottom: '0.75rem' }}
        >
          📍 Ouvrir dans Maps
        </a>
        {onContinue && (
          <button type="button" className="btn btn--primary" onClick={onContinue} style={{ width: '100%' }}>
            {stop.order < totalStops ? 'Prochaine énigme →' : 'Voir l\'album souvenir →'}
          </button>
        )}
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
          J'ai deviné! 🎯
        </button>
      </form>
    </div>
  );
}
