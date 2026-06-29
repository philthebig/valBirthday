const STORAGE_KEY = 'tremblant-hunt-progress';

export type TreasureHuntPhotos = Record<number, string | null>;

export interface HuntStorage {
  completedIds: string[];
  started: boolean;
  treasureHuntPhotos: TreasureHuntPhotos;
  /** Stop id awaiting photo before unlock */
  awaitingPhotoId: string | null;
}

const emptyPhotos = (total: number): TreasureHuntPhotos =>
  Object.fromEntries(Array.from({ length: total }, (_, i) => [i + 1, null]));

function defaultStorage(total: number): HuntStorage {
  return {
    completedIds: [],
    started: false,
    treasureHuntPhotos: emptyPhotos(total),
    awaitingPhotoId: null,
  };
}

export function loadHuntStorage(total: number): HuntStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStorage(total);
    const data = JSON.parse(raw) as Partial<HuntStorage>;
    const photos = { ...emptyPhotos(total), ...(data.treasureHuntPhotos ?? {}) };
    return {
      completedIds: data.completedIds ?? [],
      started: data.started ?? false,
      treasureHuntPhotos: photos,
      awaitingPhotoId: data.awaitingPhotoId ?? null,
    };
  } catch {
    return defaultStorage(total);
  }
}

export function saveHuntStorage(data: HuntStorage) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
