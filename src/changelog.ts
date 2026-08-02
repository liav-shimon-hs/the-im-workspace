export interface ChangelogEntry {
  id: string;
  title: string;
  description: string;
  date: string;
}

/** Newest first. Add an entry here whenever something new ships — the bell picks it up automatically. */
export const changelog: ChangelogEntry[] = [
  {
    id: "2026-08-02-notifications-panel",
    title: "Notifications panel",
    description:
      "The bell now opens a real panel with Unread/Read tabs and a menu to mark all as read or clear all notifications, instead of auto-clearing on open.",
    date: "2026-08-02",
  },
  {
    id: "2026-08-02-suggestion-box",
    title: "Suggestion box",
    description:
      "Added a way to send dashboard improvement ideas straight to an email draft, from the bottom of the sidebar.",
    date: "2026-08-02",
  },
  {
    id: "2026-08-02-ps-tracker",
    title: "PS Tracker card",
    description:
      "Added a General-tab card linking directly to the PS Project Tracker spreadsheet tab.",
    date: "2026-08-02",
  },
  {
    id: "2026-08-02-workday-theme",
    title: "Workday theme",
    description:
      "Switched to a light/dark theme with Workday orange/blue colors, a real usage chart, and lightbulb info popovers on every card.",
    date: "2026-08-02",
  },
];
