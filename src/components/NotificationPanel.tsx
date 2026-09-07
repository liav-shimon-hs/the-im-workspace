import { useState } from "react";
import { changelog } from "../changelog";
import {
  getSeenIds,
  getDismissedIds,
  markAllSeen,
  markSeen,
  markUnseen,
  dismissAll,
} from "../lib/notifications";

const allIds = changelog.map((c) => c.id);
const PAGE_SIZE = 6;

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"unread" | "read">("unread");
  const [menuOpen, setMenuOpen] = useState(false);
  const [seen, setSeen] = useState(() => getSeenIds());
  const [dismissed, setDismissed] = useState(() => getDismissedIds());
  const [pendingRead, setPendingRead] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [justUnread, setJustUnread] = useState<string | null>(null);

  const visible = changelog.filter((c) => !dismissed.has(c.id));
  const entries = visible.filter((c) => (tab === "unread" ? !seen.has(c.id) : seen.has(c.id)));
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageEntries = entries.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  const switchTab = (t: "unread" | "read") => {
    setTab(t);
    setPage(0);
    setJustUnread(null);
  };

  const handleCardClick = (id: string) => {
    if (tab === "unread") {
      setPendingRead((prev) => new Set(prev).add(id));
      setJustUnread(null);
    }
  };

  const handleMarkUnread = (id: string) => {
    markUnseen(id);
    setSeen(getSeenIds());
    setPendingRead((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setTab("unread");
    setPage(0);
    setJustUnread(id);
  };

  const handleClose = () => {
    if (pendingRead.size > 0) markSeen([...pendingRead]);
    onClose();
  };

  const handleMarkAllRead = () => {
    markAllSeen(allIds);
    setSeen(getSeenIds());
    setPendingRead(new Set());
    setMenuOpen(false);
  };

  const handleClearAll = () => {
    dismissAll(allIds);
    setDismissed(getDismissedIds());
    setMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
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
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition"
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
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex px-5 border-b border-gray-200 dark:border-gray-700">
          <TabButton label="Unread" active={tab === "unread"} onClick={() => switchTab("unread")} />
          <TabButton label="Read" active={tab === "read"} onClick={() => switchTab("read")} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pageEntries.map((entry) => {
            const isUnread = tab === "unread" && !pendingRead.has(entry.id);
            const isJustUnread = entry.id === justUnread;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleCardClick(entry.id)}
                className={`w-full text-left rounded-lg border p-3 transition ${
                  isUnread
                    ? "border-wdorange-200 dark:border-wdorange-500/30 bg-wdorange-50/40 dark:bg-wdorange-500/5"
                    : "border-gray-200 dark:border-gray-700"
                } ${isJustUnread ? "ring-2 ring-wdorange-400" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {isUnread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-wdorange-500 shrink-0" />
                    )}
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {entry.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                    {entry.date}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {entry.description}
                </p>
                {tab === "read" && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkUnread(entry.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        handleMarkUnread(entry.id);
                      }
                    }}
                    className="inline-block text-[11px] text-wdorange-600 dark:text-wdorange-400 hover:underline mt-2"
                  >
                    Mark as unread
                  </span>
                )}
              </button>
            );
          })}
          {entries.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {tab === "unread" ? "No unread notifications." : "No read notifications."}
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="shrink-0 flex items-center justify-between px-5 py-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              ‹
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              ›
            </button>
          </div>
        )}
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
