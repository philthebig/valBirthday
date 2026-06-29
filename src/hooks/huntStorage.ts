const STORAGE_KEY = 'tremblant-hunt-progress';
const PHOTO_PREFIX = 'tremblant-hunt-photo-';

export type TreasureHuntPhotos = Record<number, string | null>;

export interface HuntStorage {
  completedIds: string[];
  started: boolean;
  awaitingPhotoId: string | null;
}

const emptyStorage = (): HuntStorage => ({
  completedIds: [],
  started: false,
  awaitingPhotoId: null,
});

/** Photos stored separately — avoids bloating the main JSON blob */
export function savePhoto(order: number, base64: string): boolean {
  try {
    localStorage.setItem(`${PHOTO_PREFIX}${order}`, base64);
    return true;
  } catch {
    return false;
  }
}

export function loadPhoto(order: number): string | null {
  return localStorage.getItem(`${PHOTO_PREFIX}${order}`);
}

export function loadAllPhotos(total: number): TreasureHuntPhotos {
  const photos: TreasureHuntPhotos = {};
  for (let i = 1; i <= total; i++) {
    photos[i] = loadPhoto(i);
  }
  return photos;
}

export function clearAllPhotos(total: number) {
  for (let i = 1; i <= total; i++) {
    localStorage.removeItem(`${PHOTO_PREFIX}${i}`);
  }
}

/** Migrate photos embedded in old monolithic storage */
function migrateLegacyPhotos(raw: Record<string, unknown>, total: number) {
  const legacy = raw.treasureHuntPhotos as Record<string, string> | undefined;
  if (!legacy) return;
  for (let i = 1; i <= total; i++) {
    const src = legacy[i] ?? legacy[String(i)];
    if (src && !loadPhoto(i)) {
      savePhoto(i, src);
    }
  }
}

export function loadHuntStorage(total: number): HuntStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStorage();
    const data = JSON.parse(raw) as Partial<HuntStorage> & Record<string, unknown>;
    migrateLegacyPhotos(data, total);
    return {
      completedIds: data.completedIds ?? [],
      started: data.started ?? false,
      awaitingPhotoId: data.awaitingPhotoId ?? null,
    };
  } catch {
    return emptyStorage();
  }
}

export function saveHuntStorage(data: HuntStorage) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function getPhoto(photos: TreasureHuntPhotos, order: number): string | null {
  return photos[order] ?? photos[Number(order)] ?? loadPhoto(order);
}
