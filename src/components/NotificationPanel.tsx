import { changelog } from "../changelog";

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-80 max-w-full h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-medium text-gray-900 dark:text-white">What's new</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {changelog.map((entry) => (
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
          {changelog.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">No updates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
