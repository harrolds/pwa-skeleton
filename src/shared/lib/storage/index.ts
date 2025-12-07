const STORAGE_PREFIX = 'pwa-skeleton';

const getStorageKey = (key: string): string => {
  return `${STORAGE_PREFIX}:${key}`;
};

const isStorageAvailable = (): boolean => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return false;
  }

  try {
    const testKey = `${STORAGE_PREFIX}:__test__`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const storageAvailable = isStorageAvailable();

export const getItems = <T = unknown>(key: string): T[] => {
  if (!storageAvailable) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(key));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as T[];
  } catch {
    return [];
  }
};

export const setItems = <T = unknown>(key: string, items: T[]): void => {
  if (!storageAvailable) {
    return;
  }

  try {
    const value = JSON.stringify(items);
    window.localStorage.setItem(getStorageKey(key), value);
  } catch {
    // noop
  }
};

export const clearItems = (key: string): void => {
  if (!storageAvailable) {
    return;
  }

  try {
    window.localStorage.removeItem(getStorageKey(key));
  } catch {
    // noop
  }
};
