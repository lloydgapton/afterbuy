export const PURCHASES_STORAGE_KEY = "afterbuy:purchases:v1"
export const ACTIVITIES_STORAGE_KEY = "afterbuy:activities:v1"

export function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) return fallback

    const parsedValue: unknown = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue as T[] : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full. The in-memory app state remains usable.
  }
}
