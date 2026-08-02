import { features, tabs, type TabId } from "../features";
import FeatureCard from "../components/FeatureCard";

export default function PlaceholderTabPage({ tab }: { tab: TabId }) {
  const meta = tabs.find((t) => t.id === tab)!;
  const tabFeatures = features.filter((f) => f.tab === tab);

  return (
    <div className="h-full overflow-y-auto">
      <header className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span>{meta.icon}</span>
          {meta.label}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          More {meta.label.toLowerCase()} tools land here next.
        </p>
      </header>

      <div className="px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tabFeatures.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
        {tabFeatures.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Nothing here yet — this tab is ready for the next feature.
          </div>
        )}
      </div>
    </div>
  );
}
