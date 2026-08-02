import { useMemo } from "react";
import { features } from "../features";
import FeatureCard from "../components/FeatureCard";
import UsageChart from "../components/UsageChart";
import { useUsage } from "../lib/useUsage";
import type { Theme } from "../lib/useTheme";

export default function OverviewPage({ query, theme }: { query: string; theme: Theme }) {
  const usage = useUsage();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return features;
    return features.filter((f) =>
      [f.title, f.subtitle, f.description].some((s) => s?.toLowerCase().includes(q))
    );
  }, [query]);

  const totalClicks = Object.values(usage).reduce((sum, n) => sum + n, 0);
  const topFeature = [...features].sort((a, b) => (usage[b.id] ?? 0) - (usage[a.id] ?? 0))[0];
  const topFeatureLabel = (usage[topFeature?.id] ?? 0) > 0 ? topFeature.title : "No usage yet";
  const docsCount = features.filter((f) => f.doc?.articleUrl).length;

  return (
    <div className="h-full overflow-y-auto">
      <header className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Quick access and usage at a glance.
        </p>
      </header>

      <div className="px-8 pb-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="📈" accent="orange" value={totalClicks} label="Clicks this browser" />
        <StatCard icon="🔄" accent="blue" value={topFeatureLabel} label="Most used action" />
        <StatCard icon="🧭" accent="orange" value={features.length} label="Actions available" />
        <StatCard icon="📚" accent="blue" value={docsCount} label="Documented articles" />
      </div>

      <div className="px-8 pb-4">
        <UsageChart theme={theme} />
      </div>

      <div className="px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {results.slice(0, 5).map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
        {results.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 text-sm">No actions match "{query}".</div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  accent,
  value,
  label,
}: {
  icon: string;
  accent: "orange" | "blue";
  value: string | number;
  label: string;
}) {
  const iconClasses =
    accent === "orange"
      ? "bg-wdorange-50 dark:bg-wdorange-500/10 text-wdorange-600 dark:text-wdorange-400"
      : "bg-wdblue-50 dark:bg-wdblue-500/10 text-wdblue-600 dark:text-wdblue-400";

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${iconClasses}`}>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-3">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
