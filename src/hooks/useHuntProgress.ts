import { useCallback, useEffect, useState } from 'react';
import {
  loadHuntStorage,
  saveHuntStorage,
  type HuntStorage,
  type TreasureHuntPhotos,
} from './huntStorage';

export function useHuntProgress(totalStops: number) {
  const [storage, setStorage] = useState<HuntStorage | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStorage(loadHuntStorage(totalStops));
    setLoaded(true);
  }, [totalStops]);

  const persist = useCallback(
    (next: HuntStorage) => {
      setStorage(next);
      saveHuntStorage(next);
    },
    [],
  );

  const startHunt = useCallback(() => {
    if (!storage) return;
    persist({ ...storage, started: true });
  }, [storage, persist]);

  const setAwaitingPhoto = useCallback(
    (stopId: string) => {
      if (!storage) return;
      persist({ ...storage, awaitingPhotoId: stopId });
    },
    [storage, persist],
  );

  const savePhotoAndComplete = useCallback(
    (stopId: string, order: number, base64: string) => {
      if (!storage) return;
      const photos: TreasureHuntPhotos = {
        ...storage.treasureHuntPhotos,
        [order]: base64,
      };
      const completedIds = storage.completedIds.includes(stopId)
        ? storage.completedIds
        : [...storage.completedIds, stopId];
      persist({
        ...storage,
        completedIds,
        treasureHuntPhotos: photos,
        awaitingPhotoId: null,
      });
    },
    [storage, persist],
  );

  const clearAwaitingPhoto = useCallback(() => {
    if (!storage) return;
    persist({ ...storage, awaitingPhotoId: null });
  }, [storage, persist]);

  const resetHunt = useCallback(() => {
    localStorage.removeItem('tremblant-hunt-progress');
    setStorage(loadHuntStorage(totalStops));
  }, [totalStops]);

  const completedIds = storage?.completedIds ?? [];
  const started = storage?.started ?? false;
  const treasureHuntPhotos = storage?.treasureHuntPhotos ?? {};
  const awaitingPhotoId = storage?.awaitingPhotoId ?? null;

  const currentIndex = completedIds.length;
  const allPhotosTaken =
    totalStops > 0 &&
    Array.from({ length: totalStops }, (_, i) => i + 1).every(
      (n) => treasureHuntPhotos[n] != null && treasureHuntPhotos[n] !== '',
    );
  const isComplete = completedIds.length >= totalStops && allPhotosTaken;
  const progress = totalStops > 0 ? (completedIds.length / totalStops) * 100 : 0;

  return {
    completedIds,
    started,
    loaded,
    treasureHuntPhotos,
    awaitingPhotoId,
    startHunt,
    setAwaitingPhoto,
    savePhotoAndComplete,
    clearAwaitingPhoto,
    resetHunt,
    currentIndex,
    isComplete,
    progress,
    isStopCompleted: (id: string) => completedIds.includes(id),
  };
}
