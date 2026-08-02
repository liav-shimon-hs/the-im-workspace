const STORAGE_KEY = "pm-dashboard.seenChangelog";

function getSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function getUnseenCount(allIds: string[]): number {
  const seen = getSeen();
  return allIds.filter((id) => !seen.has(id)).length;
}

export function markAllSeen(allIds: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
  window.dispatchEvent(new CustomEvent("pm-dashboard:notifications-changed"));
}
