import { useState } from "react";

const RECIPIENT = "liav.shimon@workday.com";

export default function SuggestionModal({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");

  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    "The IM Workspace suggestion"
  )}&body=${encodeURIComponent(text)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📮</span>
          <h3 className="text-gray-900 dark:text-white font-medium">Click here to help improve</h3>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Add your suggestion on how we can improve the dashboard
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="What would make this dashboard more useful?"
          autoFocus
          className="mt-3 w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-wdorange-400 resize-none"
        />

        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
          Opens your email client with this pre-filled — you'll still need to hit send there.
        </p>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancel
          </button>
          <a
            href={mailto}
            onClick={onClose}
            className={`px-3 py-1.5 text-sm rounded-lg text-white transition ${
              text.trim()
                ? "bg-wdorange-500 hover:bg-wdorange-600"
                : "bg-gray-300 dark:bg-gray-600 pointer-events-none"
            }`}
          >
            Send suggestion →
          </a>
        </div>
      </div>
    </div>
  );
}
