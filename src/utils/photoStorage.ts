const DB_NAME = 'val-birthday-photos-v1';
const STORE = 'photos';
const LS_PREFIX = 'tremblant-hunt-photo-';

export type PhotoMap = Record<number, string | null>;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbPut(order: number, base64: string): Promise<boolean> {
  return openDb()
    .then(
      (db) =>
        new Promise<boolean>((resolve) => {
          const tx = db.transaction(STORE, 'readwrite');
          tx.objectStore(STORE).put(base64, String(order));
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        }),
    )
    .catch(() => false);
}

function idbGet(order: number): Promise<string | null> {
  return openDb()
    .then(
      (db) =>
        new Promise<string | null>((resolve) => {
          const tx = db.transaction(STORE, 'readonly');
          const req = tx.objectStore(STORE).get(String(order));
          req.onsuccess = () => resolve((req.result as string) ?? null);
          req.onerror = () => resolve(null);
        }),
    )
    .catch(() => null);
}

function lsPut(order: number, base64: string): boolean {
  try {
    localStorage.setItem(`${LS_PREFIX}${order}`, base64);
    return true;
  } catch {
    return false;
  }
}

function lsGet(order: number): string | null {
  try {
    return localStorage.getItem(`${LS_PREFIX}${order}`);
  } catch {
    return null;
  }
}

/** Save to IndexedDB + localStorage fallback */
export async function savePhoto(order: number, base64: string): Promise<boolean> {
  const idbOk = await idbPut(order, base64);
  const lsOk = lsPut(order, base64);
  return idbOk || lsOk;
}

export async function loadAllPhotos(total: number): Promise<PhotoMap> {
  const photos: PhotoMap = {};
  for (let i = 1; i <= total; i++) {
    const fromIdb = await idbGet(i);
    photos[i] = fromIdb ?? lsGet(i);
  }
  return photos;
}

export function loadAllPhotosSync(total: number): PhotoMap {
  const photos: PhotoMap = {};
  for (let i = 1; i <= total; i++) {
    photos[i] = lsGet(i);
  }
  return photos;
}

export async function clearAllPhotos(total: number): Promise<void> {
  for (let i = 1; i <= total; i++) {
    localStorage.removeItem(`${LS_PREFIX}${i}`);
    try {
      const db = await openDb();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(String(i));
    } catch {
      /* ignore */
    }
  }
}

export function getPhoto(photos: PhotoMap, order: number): string | null {
  const v = photos[order];
  if (v) return v;
  return lsGet(order);
}
