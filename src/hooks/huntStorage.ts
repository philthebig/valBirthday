const STORAGE_KEY = 'tremblant-hunt-progress';
const APP_VERSION = '1.5.0';

export { APP_VERSION };

export interface HuntStorage {
  completedIds: string[];
  started: boolean;
  awaitingPhotoId: string | null;
  /** Set when user finishes last stop — forces album view */
  showAlbum?: boolean;
}

const emptyStorage = (): HuntStorage => ({
  completedIds: [],
  started: false,
  awaitingPhotoId: null,
  showAlbum: false,
});

/** Migrate photos embedded in old monolithic storage */
function migrateLegacyPhotos(raw: Record<string, unknown>, total: number) {
  const legacy = raw.treasureHuntPhotos as Record<string, string> | undefined;
  if (!legacy) return;
  for (let i = 1; i <= total; i++) {
    const src = legacy[i] ?? legacy[String(i)];
    if (src) {
      try {
        localStorage.setItem(`tremblant-hunt-photo-${i}`, src);
      } catch {
        /* ignore */
      }
    }
  }
}

export function loadHuntStorage(total: number): HuntStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStorage();
    const data = JSON.parse(raw) as Partial<HuntStorage> & Record<string, unknown>;
    migrateLegacyPhotos(data, total);

    const completedIds = data.completedIds ?? [];
    let awaitingPhotoId = data.awaitingPhotoId ?? null;

    // Stuck state fix: if all done, clear pending photo flag
    if (completedIds.length >= total) {
      awaitingPhotoId = null;
    }

    return {
      completedIds,
      started: data.started ?? false,
      awaitingPhotoId,
      showAlbum: data.showAlbum ?? completedIds.length >= total,
    };
  } catch {
    return emptyStorage();
  }
}

export function saveHuntStorage(data: HuntStorage): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
