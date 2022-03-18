export function safeGet(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (e) {
    console.error(e);
    return fallback;
  }
}

export function safeSet(key: string, value: string) {
  try {
    return localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
}

export function isLocalStorageAvailable(): boolean {
  try {
    return true;
  } catch (e) {
    return false;
  }
}
