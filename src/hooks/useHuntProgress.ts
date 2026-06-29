import { useCallback, useEffect, useState } from 'react';
import { loadHuntStorage, saveHuntStorage, type HuntStorage } from './huntStorage';
import {
  clearAllPhotos,
  loadAllPhotos,
  loadAllPhotosSync,
  savePhoto,
  type PhotoMap,
} from '../utils/photoStorage';

export function useHuntProgress(totalStops: number) {
  const [storage, setStorage] = useState<HuntStorage | null>(null);
  const [photos, setPhotos] = useState<PhotoMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = loadHuntStorage(totalStops);
    setStorage(data);
    setPhotos(loadAllPhotosSync(totalStops));
    loadAllPhotos(totalStops).then(setPhotos);
    setLoaded(true);
  }, [totalStops]);

  const refreshPhotos = useCallback(async () => {
    const all = await loadAllPhotos(totalStops);
    setPhotos(all);
    return all;
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
    updateStorage((prev) => ({ ...prev, started: true, showAlbum: false }));
  }, [updateStorage]);

  const setAwaitingPhoto = useCallback(
    (stopId: string) => {
      updateStorage((prev) => ({ ...prev, awaitingPhotoId: stopId, showAlbum: false }));
    },
    [updateStorage],
  );

  const savePhotoAndComplete = useCallback(
    async (stopId: string, order: number, base64: string): Promise<boolean> => {
      const saved = await savePhoto(order, base64);
      if (!saved) return false;

      updateStorage((prev) => {
        const completedIds = prev.completedIds.includes(stopId)
          ? prev.completedIds
          : [...prev.completedIds, stopId];
        return {
          ...prev,
          completedIds,
          awaitingPhotoId: null,
          showAlbum: completedIds.length >= totalStops,
        };
      });

      await refreshPhotos();
      return true;
    },
    [totalStops, updateStorage, refreshPhotos],
  );

  const openAlbum = useCallback(() => {
    updateStorage((prev) => ({ ...prev, showAlbum: true, awaitingPhotoId: null }));
  }, [updateStorage]);

  const resetHunt = useCallback(async () => {
    localStorage.removeItem('tremblant-hunt-progress');
    await clearAllPhotos(totalStops);
    setStorage(loadHuntStorage(totalStops));
    setPhotos({});
    const all = await loadAllPhotos(totalStops);
    setPhotos(all);
  }, [totalStops]);

  const completedIds = storage?.completedIds ?? [];
  const started = storage?.started ?? false;
  const awaitingPhotoId = storage?.awaitingPhotoId ?? null;
  const showAlbumFlag = storage?.showAlbum ?? false;

  const currentIndex = completedIds.length;
  const photoCount = Array.from({ length: totalStops }, (_, i) => i + 1).filter(
    (n) => photos[n] != null && photos[n] !== '',
  ).length;
  const allRiddlesSolved = completedIds.length >= totalStops;
  const isComplete = allRiddlesSolved && photoCount >= totalStops;

  return {
    completedIds,
    started,
    loaded,
    treasureHuntPhotos: photos,
    awaitingPhotoId,
    showAlbumFlag,
    startHunt,
    setAwaitingPhoto,
    savePhotoAndComplete,
    openAlbum,
    resetHunt,
    refreshPhotos,
    currentIndex,
    isComplete,
    allRiddlesSolved,
    photoCount,
    progress: totalStops > 0 ? (completedIds.length / totalStops) * 100 : 0,
    isStopCompleted: (id: string) => completedIds.includes(id),
  };
}
