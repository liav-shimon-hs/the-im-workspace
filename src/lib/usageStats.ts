const STORAGE_KEY = "pm-dashboard.usage";

export type UsageMap = Record<string, number>;

function readUsage(): UsageMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UsageMap) : {};
  } catch {
    return {};
  }
}

function writeUsage(usage: UsageMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

export function recordUsage(featureId: string) {
  const usage = readUsage();
  usage[featureId] = (usage[featureId] ?? 0) + 1;
  writeUsage(usage);
  window.dispatchEvent(new CustomEvent("pm-dashboard:usage-changed"));
}

export function getUsage(): UsageMap {
  return readUsage();
}
