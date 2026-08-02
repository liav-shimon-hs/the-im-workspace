import { useUnseenCount } from "../lib/useUnseenCount";
import type { Theme } from "../lib/useTheme";

export default function Header({
  query,
  onQueryChange,
  theme,
  onToggleTheme,
  onOpenNotifications,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenNotifications: () => void;
}) {
  const unseenCount = useUnseenCount();

  return (
    <header className="h-16 shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="relative w-80">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search any action across the dashboard…"
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-9 pr-3 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-wdorange-400 focus:bg-white dark:focus:bg-gray-900"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleTheme}
          title="Toggle dark mode"
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button
          type="button"
          onClick={onOpenNotifications}
          title={unseenCount > 0 ? `${unseenCount} new` : "No new updates"}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          🔔
          {unseenCount === 1 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-wdorange-500" />
          )}
          {unseenCount > 1 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-wdorange-500 text-white text-[10px] font-semibold flex items-center justify-center">
              {unseenCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
