import { useState } from "react";
import type { Feature } from "../features";
import { recordUsage } from "../lib/usageStats";

export default function PickerModal({
  feature,
  onClose,
}: {
  feature: Feature;
  onClose: () => void;
}) {
  const picker = feature.picker!;
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      picker.fields.map((f) => [f.id, f.type === "text" ? "" : f.options[0].value])
    )
  );

  const url = picker.buildUrl(values);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{feature.icon}</span>
          <h3 className="text-gray-900 dark:text-white font-medium">{feature.title}</h3>
        </div>
        {feature.subtitle && (
          <div className="text-[11px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">
            {feature.subtitle}
          </div>
        )}

        <div className="space-y-3 mt-4">
          {picker.fields.map((field) => (
            <label key={field.id} className="block">
              <span className="text-xs text-gray-500 dark:text-gray-400">{field.label}</span>
              {field.type === "text" ? (
                <input
                  type="text"
                  value={values[field.id]}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.id]: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm px-3 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-wdorange-400"
                />
              ) : (
                <select
                  value={values[field.id]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.id]: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm px-3 py-2 focus:outline-none focus:border-wdorange-400"
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </label>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancel
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              recordUsage(feature.id);
              onClose();
            }}
            className="px-3 py-1.5 text-sm rounded-lg text-white bg-wdorange-500 hover:bg-wdorange-600 transition"
          >
            Open →
          </a>
        </div>
      </div>
    </div>
  );
}
