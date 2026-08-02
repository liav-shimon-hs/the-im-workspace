import Chart from "react-apexcharts";
import { features, accentChartHex } from "../features";
import { useUsage } from "../lib/useUsage";
import type { Theme } from "../lib/useTheme";

const CHART_LABEL_COLOR: Record<Theme, string> = { light: "#6b7280", dark: "#9ca3af" };
const CHART_GRID_COLOR: Record<Theme, string> = { light: "#f1f5f9", dark: "#374151" };

export default function UsageChart({ theme }: { theme: Theme }) {
  const usage = useUsage();
  const ranked = [...features]
    .map((f) => ({ feature: f, count: usage[f.id] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const totalClicks = Object.values(usage).reduce((sum, n) => sum + n, 0);

  if (totalClicks === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Usage by action</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">This browser</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No usage yet — click a card below to get started.
        </p>
      </div>
    );
  }

  const options = {
    chart: {
      type: "bar" as const,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      background: "transparent",
    },
    theme: { mode: theme },
    xaxis: {
      categories: ranked.map((r) => r.feature.title),
      labels: { style: { colors: CHART_LABEL_COLOR[theme], fontSize: "12px" } },
    },
    yaxis: { labels: { style: { colors: CHART_LABEL_COLOR[theme], fontSize: "12px" } } },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: true, distributed: true, barHeight: "55%" },
    },
    colors: ranked.map((r) => accentChartHex[r.feature.accent]),
    legend: { show: false },
    grid: { borderColor: CHART_GRID_COLOR[theme] },
    dataLabels: { enabled: false },
    tooltip: { theme },
  };

  const series = [{ name: "Clicks", data: ranked.map((r) => r.count) }];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Usage by action</h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {totalClicks} clicks this browser
        </span>
      </div>
      <Chart options={options} series={series} type="bar" height={220} />
    </div>
  );
}
