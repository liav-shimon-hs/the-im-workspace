const SEEN_KEY = "pm-dashboard.seenChangelog";
const DISMISSED_KEY = "pm-dashboard.dismissedChangelog";

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, ids: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...ids]));
  window.dispatchEvent(new CustomEvent("pm-dashboard:notifications-changed"));
}

export function getSeenIds(): Set<string> {
  return readSet(SEEN_KEY);
}

export function getDismissedIds(): Set<string> {
  return readSet(DISMISSED_KEY);
}

export function getUnseenCount(allIds: string[]): number {
  const seen = getSeenIds();
  const dismissed = getDismissedIds();
  return allIds.filter((id) => !seen.has(id) && !dismissed.has(id)).length;
}

export function markAllSeen(allIds: string[]) {
  writeSet(SEEN_KEY, new Set(allIds));
}

/** Adds to the existing seen set, unlike markAllSeen which replaces it. */
export function markSeen(ids: string[]) {
  const seen = getSeenIds();
  ids.forEach((id) => seen.add(id));
  writeSet(SEEN_KEY, seen);
}

export function markUnseen(id: string) {
  const seen = getSeenIds();
  seen.delete(id);
  writeSet(SEEN_KEY, seen);
}

export function dismissAll(allIds: string[]) {
  writeSet(DISMISSED_KEY, new Set(allIds));
}
