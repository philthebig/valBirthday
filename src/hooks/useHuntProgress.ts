import { useCallback, useEffect, useState } from 'react';
import {
  clearAllPhotos,
  loadAllPhotos,
  loadHuntStorage,
  saveHuntStorage,
  savePhoto,
  type HuntStorage,
  type TreasureHuntPhotos,
} from './huntStorage';

export function useHuntProgress(totalStops: number) {
  const [storage, setStorage] = useState<HuntStorage | null>(null);
  const [photos, setPhotos] = useState<TreasureHuntPhotos>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStorage(loadHuntStorage(totalStops));
    setPhotos(loadAllPhotos(totalStops));
    setLoaded(true);
  }, [totalStops]);

  const updateStorage = useCallback((updater: (prev: HuntStorage) => HuntStorage) => {
    setStorage((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveHuntStorage(next);
      return next;
    });
  }, []);

  const startHunt = useCallback(() => {
    updateStorage((prev) => ({ ...prev, started: true }));
  }, [updateStorage]);

  const setAwaitingPhoto = useCallback(
    (stopId: string) => {
      updateStorage((prev) => ({ ...prev, awaitingPhotoId: stopId }));
    },
    [updateStorage],
  );

  const savePhotoAndComplete = useCallback(
    (stopId: string, order: number, base64: string): boolean => {
      const saved = savePhoto(order, base64);
      if (!saved) return false;

      updateStorage((prev) => ({
        ...prev,
        completedIds: prev.completedIds.includes(stopId)
          ? prev.completedIds
          : [...prev.completedIds, stopId],
        awaitingPhotoId: null,
      }));
      setPhotos(loadAllPhotos(totalStops));
      return true;
    },
    [totalStops, updateStorage],
  );

  const resetHunt = useCallback(() => {
    localStorage.removeItem('tremblant-hunt-progress');
    clearAllPhotos(totalStops);
    setStorage(loadHuntStorage(totalStops));
    setPhotos(loadAllPhotos(totalStops));
  }, [totalStops]);

  const completedIds = storage?.completedIds ?? [];
  const started = storage?.started ?? false;
  const awaitingPhotoId = storage?.awaitingPhotoId ?? null;

  const currentIndex = completedIds.length;
  const photoCount = Array.from({ length: totalStops }, (_, i) => i + 1).filter(
    (n) => photos[n] != null && photos[n] !== '',
  ).length;
  const allPhotosTaken = photoCount >= totalStops;
  const allRiddlesSolved = completedIds.length >= totalStops;
  const isComplete = allRiddlesSolved && allPhotosTaken;
  const progress = totalStops > 0 ? (completedIds.length / totalStops) * 100 : 0;

  return {
    completedIds,
    started,
    loaded,
    treasureHuntPhotos: photos,
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
    isStopCompleted: (id: string) => completedIds.includes(id),
  };
}
