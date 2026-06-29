import { useState } from 'react';
import { config } from './config';
import { huntStops } from './data/hunt';
import { useHuntProgress } from './hooks/useHuntProgress';
import { DiscoveredStops } from './components/DiscoveredStops';
import { MemoryCollage } from './components/MemoryCollage';
import { PhotoCapture } from './components/PhotoCapture';
import { ProgressBar } from './components/ProgressBar';
import { ResetProgressButton } from './components/ResetProgressButton';
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
    allRiddlesSolved,
    photoCount,
    progress,
  } = useHuntProgress(huntStops.length);

  const [revealedId, setRevealedId] = useState<string | null>(null);

  const handleReset = () => {
    resetHunt();
    setRevealedId(null);
  };

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
        <ResetProgressButton onReset={handleReset} />
      </main>
    );
  }

  const showAlbum =
    (isComplete || (allRiddlesSolved && !awaitingPhotoId && !revealedId)) &&
    !awaitingPhotoId &&
    !revealedId;

  if (showAlbum) {
    return (
      <main className="app app--final">
        <ProgressBar
          progress={100}
          current={huntStops.length}
          total={huntStops.length}
          label={`Souvenirs ${photoCount}/${huntStops.length}`}
          full
        />
        <MemoryCollage stops={huntStops} photos={treasureHuntPhotos} />
        <ResetProgressButton onReset={handleReset} />
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

  const handlePhotoConfirm = (base64: string): boolean => {
    if (!displayStop || !isPhotoPhase) return false;
    const ok = savePhotoAndComplete(displayStop.id, displayStop.order, base64);
    if (ok) setRevealedId(displayStop.id);
    return ok;
  };

  const handleContinue = () => {
    setRevealedId(null);
  };

  return (
    <main className="app app--hunt">
      <header className="header">
        <p className="header__eyebrow">{config.huntTitle}</p>
        <h1 className="header__name">Pour {config.recipientName} 💛</h1>
        <ResetProgressButton onReset={handleReset} variant="inline" />
      </header>

      <ProgressBar
        progress={progress}
        current={completedIds.length}
        total={huntStops.length}
        label={
          isPhotoPhase
            ? 'La Touche Souvenir 📸'
            : isRevealed
              ? 'Destination dévoilée'
              : 'Énigmes résolues'
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

      {!displayStop && allRiddlesSolved && (
        <div className="stuck-card">
          <p>Chasse terminée — affichage de l&apos;album souvenir…</p>
          <button type="button" className="btn btn--primary" onClick={() => setRevealedId(null)}>
            Voir l&apos;album →
          </button>
        </div>
      )}
    </main>
  );
}
