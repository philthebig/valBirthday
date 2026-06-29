import type { HuntStop } from '../data/hunt';

interface DiscoveredStopsProps {
  completedStops: HuntStop[];
  total: number;
}

/** Only shows places already guessed — future stops stay secret */
export function DiscoveredStops({ completedStops, total }: DiscoveredStopsProps) {
  if (completedStops.length === 0) return null;

  return (
    <div className="discovered">
      <h2 className="discovered__title">Trésors dévoilés</h2>
      <ul className="discovered__list">
        {completedStops.map((stop) => (
          <li key={stop.id} className="discovered__item">
            <span className="discovered__emoji" aria-hidden="true">
              {stop.emoji}
            </span>
            <span className="discovered__name">{stop.name}</span>
          </li>
        ))}
      </ul>
      <p className="discovered__remaining">
        {(() => {
          const n = total - completedStops.length;
          return n > 0 ? `${n} énigme${n > 1 ? 's' : ''} encore cachée${n > 1 ? 's' : ''}…` : '';
        })()}
      </p>
    </div>
  );
}
