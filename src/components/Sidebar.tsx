import { useState } from "react";
import { tabs, features, type TabId } from "../features";
import SuggestionModal from "./SuggestionModal";

export default function Sidebar({
  active,
  onSelect,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
}) {
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-wdorange-500 flex items-center justify-center text-base shrink-0">
          🚀
        </div>
        <span className="font-semibold text-gray-900 dark:text-white truncate">The IM Workspace</span>
      </div>

      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <div className="px-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
          Menu
        </div>
        <div className="space-y-1">
          {tabs.map((t) => {
            const count =
              t.id === "overview"
                ? features.length
                : t.id === "documentation"
                  ? features.filter((f) => f.doc?.articleUrl).length
                  : features.filter((f) => f.tab === t.id).length;
            return (
              <NavItem
                key={t.id}
                icon={t.icon}
                label={t.label}
                count={count}
                active={active === t.id}
                onClick={() => onSelect(t.id)}
              />
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setSuggestionOpen(true)}
        className="mx-3 mb-3 p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-wdorange-300 dark:hover:border-wdorange-500/50 transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📮</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Send us feedback
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Add your suggestion on how we can improve the dashboard
        </p>
      </button>

      <div className="px-5 py-3 text-[11px] text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
        v0.2 · workday theme
      </div>

      {suggestionOpen && <SuggestionModal onClose={() => setSuggestionOpen(false)} />}
    </aside>
  );
}

function NavItem({
  icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition text-sm ${
        active
          ? "bg-wdorange-50 dark:bg-wdorange-500/10 text-wdorange-700 dark:text-wdorange-400 font-medium"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
      }`}
    >
      <span className="w-5 text-center shrink-0">{icon}</span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
      <span className="text-[11px] leading-none px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shrink-0">
        {count}
      </span>
    </button>
  );
}
