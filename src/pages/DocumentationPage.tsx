import { features, accentIconClasses } from "../features";

export default function DocumentationPage() {
  const docs = features.filter((f) => f.doc?.articleUrl);

  return (
    <div className="h-full overflow-y-auto">
      <header className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span>📚</span>
          Documentation
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Where to read more about each tool.</p>
      </header>

      <div className="px-8 pb-10 space-y-2 max-w-2xl">
        {docs.map((f) => (
          <a
            key={f.id}
            href={f.doc!.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card hover:shadow-md hover:border-wdorange-200 dark:hover:border-wdorange-500/40 transition p-4 group"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${accentIconClasses[f.accent]}`}
            >
              {f.icon}
            </div>
            <span className="text-sm text-wdorange-600 dark:text-wdorange-400 group-hover:underline flex-1">
              {f.doc!.articleTitle ?? f.title}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-wdorange-500">
              →
            </span>
          </a>
        ))}
        {docs.length === 0 && (
          <div className="text-gray-400 dark:text-gray-500 text-sm">No documentation added yet.</div>
        )}
      </div>
    </div>
  );
}
