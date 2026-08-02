# The IM Workspace

A dashboard for project managers to configure and troubleshoot features, with
a tab per feature area and a usage chart showing what's used most.

## Setup

```bash
cd pm-dashboard
npm install
npm run dev
```

Opens on `http://localhost:5174`.

## Deployment

Hosted on GitHub Pages. `.github/workflows/deploy.yml` builds and deploys on
every push to `main` — no manual steps once it's set up. Only people with
push access to the repo can change what's deployed; viewing the published
site stays open to anyone with the link.

`vite.config.ts` sets `base: '/the-im-workspace/'` for production builds only
(local dev stays at `/`) — if the repo is ever renamed, update that path and
GitHub Pages' expected URL to match.

One-time setup, after creating the repo (Settings → Pages → Source →
"GitHub Actions"): the first push to `main` triggers the workflow and
publishes to `https://<username>.github.io/the-im-workspace/`.

## Theme

Light/dark, toggled from the header (persisted in `localStorage`, defaults to
the OS preference). Colors and font are defined in `src/index.css`:
Workday orange/blue ramps (`wdorange-*` / `wdblue-*`) and the Outfit font,
wired up via Tailwind v4's `@theme` block. Dark mode uses the `dark:` variant
via `@custom-variant dark (&:where(.dark, .dark *));`, toggled by adding/removing
a `dark` class on `<html>` — see `src/lib/useTheme.ts`.

## Structure

- `src/features.ts` — registry of tabs and feature cards (id, tab, title, description, icon, accent, url). Add a new card by adding an entry here. `accent` is `"orange" | "blue"`, mapped to Tailwind classes via `accentIconClasses`.
- `src/components/Sidebar.tsx` — tab navigation.
- `src/components/Header.tsx` — persistent top bar: search (filters Overview from any tab), theme toggle, notification bell.
- `src/components/FeatureCard.tsx` — a single CTA card; records a usage click on open.
- `src/components/UsageChart.tsx` — "Usage by action" bar chart (ApexCharts), top 5, reactive to theme.
- `src/pages/OverviewPage.tsx` — landing tab: stat cards + usage chart + search results.
- `src/pages/PlaceholderTabPage.tsx` — generic renderer for any other tab (Configuration, Troubleshooting, …).
- `src/pages/DocumentationPage.tsx` — flat list of "Link to article →" entries, one per feature with `doc.articleUrl`.

## Usage stats

Usage is currently tracked client-side only, in `localStorage` (per browser,
not shared across the team). This is a placeholder until there's a backend —
swap `src/lib/usageStats.ts` for a real API call when one exists; `UsageChart`
and `FeatureCard` don't need to change.

## Adding a feature/tab

- New card in an existing tab: add an entry to the `features` array in `src/features.ts`.
- New tab: add an entry to the `tabs` array in `src/features.ts`; it renders automatically via `PlaceholderTabPage` until it needs custom content (build a dedicated page like `OverviewPage.tsx` when it does).
- New docs entry: add a `doc: { summary, articleUrl }` to a feature — the lightbulb icon (present on every card) shows it; without a `doc`, the lightbulb falls back to showing the card's `description`. Only features with `doc.articleUrl` get a Documentation tab entry.

## Notifications

The header bell shows a badge for `src/changelog.ts` entries the user hasn't
"seen" yet — `src/lib/notifications.ts` compares the changelog id list against
a seen-ids set in `localStorage` (`src/lib/useUnseenCount.ts` is the reactive
hook). 1 unseen shows a plain dot, 2+ shows the count. Clicking the bell opens
`NotificationPanel` (slides in from the right, lists every changelog entry
with its description) and marks all current entries as seen.

Add a new entry to the top of `changelog.ts` whenever something ships —
that's what shows up in the panel and drives the badge count. This is
separate from `features.ts`; changelog entries can describe anything (a new
card, a theme change, a UI tweak), not just new feature cards.
