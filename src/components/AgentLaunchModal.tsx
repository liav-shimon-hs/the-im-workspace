import { useState } from "react";
import type { Feature } from "../features";
import { recordUsage } from "../lib/usageStats";

export default function AgentLaunchModal({
  feature,
  onClose,
}: {
  feature: Feature;
  onClose: () => void;
}) {
  const launch = feature.agentLaunch!;
  const [text, setText] = useState(launch.defaultPrompt);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const copyFor = async (agent: string) => {
    try {
      await navigator.clipboard.writeText(text);
      recordUsage(feature.id);
      setCopiedLabel(agent);
      setTimeout(() => setCopiedLabel(null), 2000);
    } catch {
      // clipboard access can be denied by the browser; nothing else to do here
    }
  };

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
          <span className="text-lg">{feature.icon}</span>
          <h3 className="text-gray-900 dark:text-white font-medium">{feature.title}</h3>
        </div>
        {feature.subtitle && (
          <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
            {feature.subtitle}
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Write what you need help with, then copy it into your Claude Code or Cursor chat.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="mt-3 w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-wdorange-400 resize-none"
        />

        <div className="flex gap-2 mt-3">
          {launch.agents.map((agent) => (
            <button
              key={agent}
              type="button"
              onClick={() => copyFor(agent)}
              className="flex-1 px-3 py-2.5 rounded-lg text-sm text-white bg-wdorange-500 hover:bg-wdorange-600 transition"
            >
              {copiedLabel === agent ? "Copied ✓" : `Copy for ${agent}`}
            </button>
          ))}
        </div>

        {launch.note && (
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
            {launch.note}
          </p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
