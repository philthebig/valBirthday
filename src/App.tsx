import { useEffect } from 'react';
import { config } from './config';
import { huntStops } from './data/hunt';
import { APP_VERSION } from './hooks/huntStorage';
import { useHuntProgress } from './hooks/useHuntProgress';
import { DiscoveredStops } from './components/DiscoveredStops';
import { MemoryCollage } from './components/MemoryCollage';
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
    showAlbumFlag,
    startHunt,
    setAwaitingPhoto,
    savePhotoAndComplete,
    openAlbum,
    resetHunt,
    refreshPhotos,
    currentIndex,
    allRiddlesSolved,
    photoCount,
    progress,
  } = useHuntProgress(huntStops.length);

  const handleReset = async () => {
    await resetHunt();
  };

  useEffect(() => {
    if (showAlbumFlag || allRiddlesSolved) {
      refreshPhotos();
    }
  }, [showAlbumFlag, allRiddlesSolved, refreshPhotos]);

  if (!loaded) {
    return (
      <div className="loading">
        <span className="loading__mountain" aria-hidden="true">
          🏔️
        </span>
        <p>Chargement de l&apos;aventure…</p>
      </div>
    );
  }

  if (!started) {
    return (
      <main className="app">
        <Welcome onStart={startHunt} />
        <ResetProgressButton onReset={handleReset} variant="prominent" />
        <p className="app-version">v{APP_VERSION}</p>
      </main>
    );
  }

  const showAlbum = (showAlbumFlag || allRiddlesSolved) && !awaitingPhotoId;

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
        <MemoryCollage stops={huntStops} photos={treasureHuntPhotos} onReplay={handleReset} />
        <p className="app-version">v{APP_VERSION}</p>
      </main>
    );
  }

  const activeStop = huntStops[currentIndex];
  const photoStop = awaitingPhotoId ? huntStops.find((s) => s.id === awaitingPhotoId) : null;
  const displayStop = photoStop ?? activeStop;
  const isPhotoPhase = awaitingPhotoId != null && awaitingPhotoId === displayStop?.id;

  const completedStops = huntStops.filter(
    (s) => completedIds.includes(s.id) && s.id !== awaitingPhotoId,
  );

  const handleGuessCorrect = (stop: (typeof huntStops)[number]) => {
    setAwaitingPhoto(stop.id);
  };

  const handlePhotoConfirm = async (base64: string): Promise<boolean> => {
    if (!displayStop || !isPhotoPhase) return false;
    const ok = await savePhotoAndComplete(displayStop.id, displayStop.order, base64);
    if (ok && displayStop.order >= huntStops.length) {
      openAlbum();
    }
    return ok;
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
        label={isPhotoPhase ? 'La Touche Souvenir 📸' : 'Énigmes résolues'}
      />

      {!isPhotoPhase && <DiscoveredStops completedStops={completedStops} total={huntStops.length} />}

      {displayStop && (
        <StopCard
          key={`${displayStop.id}-${isPhotoPhase ? 'photo' : 'mystery'}`}
          stop={displayStop}
          phase={isPhotoPhase ? 'photo' : 'mystery'}
          onGuessCorrect={handleGuessCorrect}
          onPhotoConfirm={handlePhotoConfirm}
          existingPhoto={treasureHuntPhotos[displayStop.order]}
        />
      )}

      <p className="app-version">v{APP_VERSION}</p>
    </main>
  );
}
