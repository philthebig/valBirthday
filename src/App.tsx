import { useState } from 'react';
import { config } from './config';
import { huntStops } from './data/hunt';
import { useHuntProgress } from './hooks/useHuntProgress';
import { DiscoveredStops } from './components/DiscoveredStops';
import { MemoryCollage } from './components/MemoryCollage';
import { PhotoCapture } from './components/PhotoCapture';
import { ProgressBar } from './components/ProgressBar';
import { StopCard } from './components/StopCard';
import { Welcome } from './components/Welcome';

export default function App() {
  const {
    completedIds,
    started,
    loaded,
    treasureHuntPhotos,
    awaitingPhotoId,
    startHunt,
    setAwaitingPhoto,
    savePhotoAndComplete,
    resetHunt,
    currentIndex,
    isComplete,
    progress,
  } = useHuntProgress(huntStops.length);

  /** After photo confirmed — show destination reveal before next enigma */
  const [revealedId, setRevealedId] = useState<string | null>(null);

  if (!loaded) {
    return (
      <div className="loading">
        <span className="loading__mountain" aria-hidden="true">
          🏔️
        </span>
        <p>Chargement de l'aventure…</p>
      </div>
    );
  }

  if (!started) {
    return (
      <main className="app">
        <Welcome onStart={startHunt} />
      </main>
    );
  }

  if (isComplete && !revealedId && !awaitingPhotoId) {
    return (
      <main className="app app--final">
        <ProgressBar
          progress={100}
          current={huntStops.length}
          total={huntStops.length}
          label="Énigmes résolues"
          full
        />
        <MemoryCollage stops={huntStops} photos={treasureHuntPhotos} />
        <button type="button" className="btn btn--ghost btn--reset" onClick={resetHunt}>
          Recommencer l'aventure
        </button>
      </main>
    );
  }

  const activeStop = huntStops[currentIndex];
  const photoStop = awaitingPhotoId ? huntStops.find((s) => s.id === awaitingPhotoId) : null;
  const revealedStop = revealedId ? huntStops.find((s) => s.id === revealedId) : null;
  const displayStop = revealedStop ?? photoStop ?? activeStop;

  const isPhotoPhase = awaitingPhotoId != null && awaitingPhotoId === displayStop?.id;
  const isRevealed = revealedId != null && revealedId === displayStop?.id;

  const completedStops = huntStops.filter(
    (s) => completedIds.includes(s.id) && s.id !== revealedId && s.id !== awaitingPhotoId,
  );

  const handleGuessCorrect = (stop: (typeof huntStops)[number]) => {
    setAwaitingPhoto(stop.id);
  };

  const handlePhotoConfirm = (base64: string) => {
    if (!displayStop || !isPhotoPhase) return;
    savePhotoAndComplete(displayStop.id, displayStop.order, base64);
    setRevealedId(displayStop.id);
  };

  const handleContinue = () => {
    setRevealedId(null);
  };

  return (
    <main className="app app--hunt">
      <header className="header">
        <p className="header__eyebrow">{config.huntTitle}</p>
        <h1 className="header__name">Pour {config.recipientName} 💛</h1>
      </header>

      <ProgressBar
        progress={progress}
        current={completedIds.length}
        total={huntStops.length}
        label={
          isPhotoPhase ? 'La Touche Souvenir 📸' : isRevealed ? 'Destination dévoilée' : 'Énigmes résolues'
        }
      />

      {!isPhotoPhase && <DiscoveredStops completedStops={completedStops} total={huntStops.length} />}

      {displayStop && isPhotoPhase && (
        <PhotoCapture
          key={`photo-${displayStop.id}`}
          enigmeNumber={displayStop.order}
          instruction={displayStop.photoInstruction}
          existingPreview={treasureHuntPhotos[displayStop.order]}
          onConfirm={handlePhotoConfirm}
        />
      )}

      {displayStop && !isPhotoPhase && (
        <StopCard
          key={`${displayStop.id}-${isRevealed ? 'revealed' : 'mystery'}`}
          stop={displayStop}
          totalStops={huntStops.length}
          phase={isRevealed ? 'revealed' : 'mystery'}
          onGuessCorrect={handleGuessCorrect}
          onContinue={isRevealed ? handleContinue : undefined}
        />
      )}
    </main>
  );
}
