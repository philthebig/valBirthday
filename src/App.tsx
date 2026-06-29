import { useState } from 'react';
import { config } from './config';
import { huntStops } from './data/hunt';
import { useHuntProgress } from './hooks/useHuntProgress';
import { burstConfetti } from './utils/confetti';
import { FinalTreasure } from './components/FinalTreasure';
import { HuntMap } from './components/HuntMap';
import { ProgressBar } from './components/ProgressBar';
import { StopCard } from './components/StopCard';
import { Welcome } from './components/Welcome';

export default function App() {
  const {
    completedIds,
    started,
    loaded,
    startHunt,
    completeStop,
    resetHunt,
    currentIndex,
    isComplete,
    progress,
    isStopCompleted,
  } = useHuntProgress(huntStops.length);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [awaitingContinueId, setAwaitingContinueId] = useState<string | null>(null);

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

  if (isComplete && !awaitingContinueId) {
    return (
      <main className="app app--final">
        <FinalTreasure />
        <button type="button" className="btn btn--ghost btn--reset" onClick={resetHunt}>
          Recommencer l'aventure
        </button>
      </main>
    );
  }

  const activeStop = huntStops[currentIndex];
  const celebratingStop = awaitingContinueId
    ? huntStops.find((s) => s.id === awaitingContinueId)
    : null;
  const displayStop =
    celebratingStop ??
    (selectedId != null ? huntStops.find((s) => s.id === selectedId) : undefined) ??
    activeStop;

  const handleComplete = (stop: (typeof huntStops)[number]) => {
    completeStop(stop.id);
    burstConfetti();
    setSelectedId(null);
    setAwaitingContinueId(stop.id);
  };

  const handleContinue = () => {
    setAwaitingContinueId(null);
  };

  return (
    <main className="app app--hunt">
      <header className="header">
        <p className="header__eyebrow">{config.huntTitle}</p>
        <h1 className="header__name">Pour {config.recipientName} 💛</h1>
      </header>

      <ProgressBar progress={progress} current={completedIds.length} total={huntStops.length} />

      <HuntMap
        stops={huntStops}
        completedIds={completedIds}
        currentIndex={currentIndex}
        onSelectStop={(s) => {
          setAwaitingContinueId(null);
          setSelectedId(s.id);
        }}
        selectedId={selectedId}
      />

      {displayStop && (
        <StopCard
          key={displayStop.id}
          stop={displayStop}
          completed={isStopCompleted(displayStop.id)}
          onComplete={handleComplete}
          onContinue={awaitingContinueId === displayStop.id ? handleContinue : undefined}
          awaitingContinue={awaitingContinueId === displayStop.id}
        />
      )}
    </main>
  );
}
