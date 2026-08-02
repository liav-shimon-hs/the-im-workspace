import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotificationPanel from "./components/NotificationPanel";
import OverviewPage from "./pages/OverviewPage";
import DocumentationPage from "./pages/DocumentationPage";
import PlaceholderTabPage from "./pages/PlaceholderTabPage";
import { useTheme } from "./lib/useTheme";
import { markAllSeen } from "./lib/notifications";
import { changelog } from "./changelog";
import type { TabId } from "./features";

const allChangelogIds = changelog.map((c) => c.id);

export default function App() {
  const [tab, setTab] = useState<TabId>("overview");
  const [query, setQuery] = useState("");
  const [theme, toggleTheme] = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (query.trim() && tab !== "overview") setTab("overview");
  }, [query, tab]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <Sidebar active={tab} onSelect={setTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          query={query}
          onQueryChange={setQuery}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenNotifications={() => {
            setNotificationsOpen(true);
            markAllSeen(allChangelogIds);
          }}
        />
        <main className="flex-1 min-w-0 overflow-hidden">
          {tab === "overview" ? (
            <OverviewPage query={query} theme={theme} />
          ) : tab === "documentation" ? (
            <DocumentationPage />
          ) : (
            <PlaceholderTabPage tab={tab} />
          )}
        </main>
      </div>
      {notificationsOpen && (
        <NotificationPanel onClose={() => setNotificationsOpen(false)} />
      )}
    </div>
  );
}
