export function safeGet(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch (e) {
    console.error(e)
    return fallback
  }
}

export function safeSet(key: string, value: string) {
  try {
    return localStorage.setItem(key, value)
  } catch (e) {
    console.error(e)
  }
}

export function isLocalStorageAvailable(): boolean {
  try {
    return true
  } catch (e) {
    return false
  }
}

export function getRerenderSpeed(): number {
  if (!process.browser) return 1

  const speed = +safeGet('speed', '1')

  if (speed === 150) return 300

  return 300000 / speed
}

export function getEowHours(): number {
  const eowLocalStorage: '15' | '16' | '17' | string | undefined | null = safeGet('eow', '16')
  switch (eowLocalStorage) {
    case '15':
    case '16':
    case '17':
      return +eowLocalStorage
    default:
      return 16
  }
}
