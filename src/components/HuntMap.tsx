import type { HuntStop } from '../data/hunt';

interface HuntMapProps {
  stops: HuntStop[];
  completedIds: string[];
  currentIndex: number;
  onSelectStop: (stop: HuntStop) => void;
  selectedId: string | null;
}

export function HuntMap({ stops, completedIds, currentIndex, onSelectStop, selectedId }: HuntMapProps) {
  return (
    <div className="hunt-map">
      <h2 className="hunt-map__title">Carte au trésor</h2>
      <div className="hunt-map__trail">
        {stops.map((stop, i) => {
          const completed = completedIds.includes(stop.id);
          const unlocked = i <= currentIndex;
          const current = i === currentIndex && !completed;
          const selected = selectedId === stop.id;

          return (
            <button
              key={stop.id}
              type="button"
              className={[
                'hunt-map__stop',
                completed && 'hunt-map__stop--done',
                current && 'hunt-map__stop--current',
                !unlocked && 'hunt-map__stop--locked',
                selected && 'hunt-map__stop--selected',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => unlocked && onSelectStop(stop)}
              disabled={!unlocked}
              aria-label={`${stop.name}${completed ? ', complété' : current ? ', en cours' : !unlocked ? ', verrouillé' : ''}`}
            >
              <span className="hunt-map__emoji" aria-hidden="true">
                {completed ? '✅' : !unlocked ? '🔒' : stop.emoji}
              </span>
              <span className="hunt-map__name">{stop.shortName}</span>
              {i < stops.length - 1 && <span className="hunt-map__connector" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
