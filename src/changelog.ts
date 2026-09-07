export interface ChangelogEntry {
  id: string;
  title: string;
  description: string;
  date: string;
}

/** Newest first. Add an entry here whenever something new ships — the bell picks it up automatically. */
export const changelog: ChangelogEntry[] = [
  {
    id: "2026-09-07-notifications-fixes-and-brain-cards",
    title: "Notification fixes & 2 new Sync Actions cards",
    description:
      "Read/unread now tracks correctly across tabs, with a highlight when you mark something unread again. Added Brain batch application tasks runner and Run fast fetch full indexing, each with cell/environment pickers.",
    date: "2026-09-07",
  },
  {
    id: "2026-08-02-notifications-panel-v2",
    title: "Notifications panel: click-to-read & paging",
    description:
      "Notifications are now clickable (marks them read once you close the panel), each has a Mark as unread option, and the list pages through 6 at a time instead of one long scroll.",
    date: "2026-08-02",
  },
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
  {
    id: "2026-08-02-troubleshooting-cards",
    title: "Sync Actions & Troubleshooting cards",
    description:
      "Added Argo Elastic Sync, Screen It, Teams API Service, TeamIT, and Bruno — configurable cell/environment pickers plus a Bruno MCP prompt launcher.",
    date: "2026-08-02",
  },
  {
    id: "2026-08-02-documentation-tab",
    title: "Documentation tab",
    description:
      "Added a Documentation tab linking out to the source article for any card that has one, plus a lightbulb info popover on every card.",
    date: "2026-08-02",
  },
  {
    id: "2026-08-02-overview-search",
    title: "Overview search",
    description:
      "Search moved to the header and works from any tab; Overview's card grid capped to 5 to match the usage chart.",
    date: "2026-08-02",
  },
];
