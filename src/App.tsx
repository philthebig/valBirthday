import { useState } from 'react';
import { config } from './config';
import { huntStops } from './data/hunt';
import { useHuntProgress } from './hooks/useHuntProgress';
import { burstConfetti } from './utils/confetti';
import { DiscoveredStops } from './components/DiscoveredStops';
import { FinalTreasure } from './components/FinalTreasure';
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
  } = useHuntProgress(huntStops.length);

  /** Current stop guessed but not yet continued to next riddle */
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

  if (isComplete && !revealedId) {
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
  const revealedStop = revealedId ? huntStops.find((s) => s.id === revealedId) : null;
  const displayStop = revealedStop ?? activeStop;
  const isRevealed = revealedId === displayStop?.id;

  const completedStops = huntStops.filter((s) => completedIds.includes(s.id) && s.id !== revealedId);

  const handleReveal = (stop: (typeof huntStops)[number]) => {
    completeStop(stop.id);
    burstConfetti();
    setRevealedId(stop.id);
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
        label={isRevealed ? 'Destination dévoilée' : 'Énigmes résolues'}
      />

      <DiscoveredStops completedStops={completedStops} total={huntStops.length} />

      {displayStop && (
        <StopCard
          key={`${displayStop.id}-${isRevealed ? 'revealed' : 'mystery'}`}
          stop={displayStop}
          totalStops={huntStops.length}
          revealed={isRevealed}
          onReveal={handleReveal}
          onContinue={isRevealed ? handleContinue : undefined}
        />
      )}
    </main>
  );
}
