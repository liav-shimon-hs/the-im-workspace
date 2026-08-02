import { useState } from "react";
import { changelog } from "../changelog";
import { getSeenIds, getDismissedIds, markAllSeen, dismissAll } from "../lib/notifications";

const allIds = changelog.map((c) => c.id);

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"unread" | "read">("unread");
  const [menuOpen, setMenuOpen] = useState(false);
  const [seen, setSeen] = useState(() => getSeenIds());
  const [dismissed, setDismissed] = useState(() => getDismissedIds());

  const visible = changelog.filter((c) => !dismissed.has(c.id));
  const entries = visible.filter((c) => (tab === "unread" ? !seen.has(c.id) : seen.has(c.id)));

  const handleMarkAllRead = () => {
    markAllSeen(allIds);
    setSeen(getSeenIds());
    setMenuOpen(false);
  };

  const handleClearAll = () => {
    dismissAll(allIds);
    setDismissed(getDismissedIds());
    setMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-80 max-w-full h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-medium text-gray-900 dark:text-white">Notifications</h2>
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition"
              >
                ⋮
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                  />
                  <div className="absolute right-0 top-9 z-20 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1">
                    <button
                      onClick={handleMarkAllRead}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      Mark all as read
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      Clear all notifications
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex px-5 border-b border-gray-200 dark:border-gray-700">
          <TabButton label="Unread" active={tab === "unread"} onClick={() => setTab("unread")} />
          <TabButton label="Read" active={tab === "read"} onClick={() => setTab("read")} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {entry.title}
                </h3>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                  {entry.date}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {entry.description}
              </p>
            </div>
          ))}
          {entries.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {tab === "unread" ? "No unread notifications." : "No read notifications."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2.5 text-sm border-b-2 -mb-px transition ${
        active
          ? "border-wdorange-500 text-wdorange-600 dark:text-wdorange-400 font-medium"
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
