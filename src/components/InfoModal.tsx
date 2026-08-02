import type { Doc, Feature } from "../features";

export default function InfoModal({
  feature,
  doc,
  onClose,
}: {
  feature: Feature;
  doc: Doc;
  onClose: () => void;
}) {
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

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
          {doc.summary}
        </p>

        {doc.articleUrl && (
          <a
            href={doc.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-wdorange-600 dark:text-wdorange-400 hover:underline mt-4"
          >
            Link to article →
          </a>
        )}

        <div className="mt-5 flex justify-end">
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
