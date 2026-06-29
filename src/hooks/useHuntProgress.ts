import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'tremblant-hunt-progress';

export function useHuntProgress(totalStops: number) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as { completedIds: string[]; started: boolean };
        setCompletedIds(data.completedIds ?? []);
        setStarted(data.started ?? false);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((ids: string[], hasStarted: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedIds: ids, started: hasStarted }));
  }, []);

  const startHunt = useCallback(() => {
    setStarted(true);
    persist(completedIds, true);
  }, [completedIds, persist]);

  const completeStop = useCallback(
    (id: string) => {
      setCompletedIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist(next, true);
        return next;
      });
    },
    [persist],
  );

  const resetHunt = useCallback(() => {
    setCompletedIds([]);
    setStarted(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const currentIndex = completedIds.length;
  const isComplete = completedIds.length >= totalStops;
  const progress = totalStops > 0 ? (completedIds.length / totalStops) * 100 : 0;

  return {
    completedIds,
    started,
    loaded,
    startHunt,
    completeStop,
    resetHunt,
    currentIndex,
    isComplete,
    progress,
    isStopUnlocked: (order: number) => order <= completedIds.length + 1,
    isStopCompleted: (id: string) => completedIds.includes(id),
  };
}
