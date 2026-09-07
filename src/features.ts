export type TabId =
  | "overview"
  | "general"
  | "sync-action"
  | "configuration"
  | "troubleshooting"
  | "documentation";

export type PickerField =
  | { id: string; label: string; type?: "select"; options: { label: string; value: string }[] }
  | { id: string; label: string; type: "text"; placeholder?: string };

export interface Picker {
  fields: PickerField[];
  buildUrl: (values: Record<string, string>) => string;
}

export interface AgentLaunch {
  /** Editable starting text for the textbox. */
  defaultPrompt: string;
  /** One "Copy for {agent}" button per entry; each copies the current (edited) text. */
  agents: string[];
  /** Shown as a note — for actions with no web-linkable login (e.g. a local desktop app). */
  note?: string;
}

export interface Doc {
  /** Short explanation shown only in the lightbulb popover. */
  summary: string;
  /** Article link — shown at the end of the popover, and as the Documentation tab entry. */
  articleUrl?: string;
  /** Link text for the Documentation tab entry. Defaults to the feature's own title. */
  articleTitle?: string;
}

export type Accent = "orange" | "blue";

export const accentIconClasses: Record<Accent, string> = {
  orange: "bg-wdorange-50 dark:bg-wdorange-500/10 text-wdorange-600 dark:text-wdorange-400",
  blue: "bg-wdblue-50 dark:bg-wdblue-500/10 text-wdblue-600 dark:text-wdblue-400",
};

export const accentChartHex: Record<Accent, string> = {
  orange: "#F49813",
  blue: "#2C69B6",
};

export interface Feature {
  id: string;
  tab: TabId;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  accent: Accent;
  /** Plain link card — provide this XOR `picker` XOR `agentLaunch`. */
  url?: string;
  /** Card that opens a small form to build the destination URL first. */
  picker?: Picker;
  /** Card that opens a chooser to copy an agent-ready prompt to the clipboard. */
  agentLaunch?: AgentLaunch;
  /** Powers the lightbulb info icon on the card and its entry in the Documentation tab. */
  doc?: Doc;
}

export const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "▤" },
  { id: "general", label: "General", icon: "📁" },
  { id: "sync-action", label: "Sync Actions", icon: "🔁" },
  { id: "configuration", label: "Configuration", icon: "⚙️" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "🧰" },
  { id: "documentation", label: "Documentation", icon: "📚" },
];

const CELLS = ["0001", "0002", "0003", "0004"];
const ENVIRONMENTS = [
  { label: "Preprod", value: "preprod" },
  { label: "Production", value: "production" },
];

export const features: Feature[] = [
  {
    id: "internal-tools",
    tab: "general",
    title: "Internal Tools",
    description: "Direct access to the internal tools console (preprod).",
    icon: "🔗",
    accent: "orange",
    url: "https://internal-tools-preprod.omcomcom.com/",
  },
  {
    id: "ps-tracker",
    tab: "general",
    title: "PS Tracker",
    description: "PS Project Tracker — search client projects and status (Google Sheet).",
    icon: "📊",
    accent: "blue",
    url: "https://docs.google.com/spreadsheets/d/1N_9DaivunLQ2ssiBS3sIsehNYPFivwLZ5bGirFYImUQ/edit?gid=1072694330#gid=1072694330",
  },
  {
    id: "spotlight-fetch-explain",
    tab: "troubleshooting",
    title: "Spotlight & Fetch Explain",
    description: "Direct access to Spotlight & Fetch Explain (production).",
    icon: "🔦",
    accent: "blue",
    url: "https://production-brain-welle-tools.omcomcom.com/",
  },
  {
    id: "argo-elastic-sync",
    tab: "sync-action",
    title: "Argo Elastic Sync",
    subtitle: "wft-elastic-sync-with-parameters",
    description: "Trigger the Elasticsearch sync workflow for a cell and environment.",
    icon: "🔄",
    accent: "orange",
    picker: {
      fields: [
        {
          id: "environment",
          label: "Environment",
          options: ENVIRONMENTS,
        },
        {
          id: "cell",
          label: "Cell",
          options: CELLS.map((c) => ({ label: c, value: c })),
        },
      ],
      buildUrl: (v) =>
        `https://argoworkflows-${v.cell}.${v.environment}.omcomcom.com/workflows/elastic-sync?limit=50&sidePanel=submit-new-workflow`,
    },
  },
  {
    id: "brain-batch-application-tasks-runner",
    tab: "sync-action",
    title: "Brain batch application tasks runner",
    subtitle: "wf-brain-batch-application-tasks-runner",
    description: "Trigger the Brain batch application tasks workflow for a cell and environment.",
    icon: "🧠",
    accent: "blue",
    picker: {
      fields: [
        {
          id: "environment",
          label: "Environment",
          options: ENVIRONMENTS,
        },
        {
          id: "cell",
          label: "Cell",
          options: CELLS.map((c) => ({ label: c, value: c })),
        },
      ],
      buildUrl: (v) =>
        `https://argoworkflows-${v.cell}.${v.environment}.omcomcom.com/workflows/wf-brain-batch-application-tasks-runner?limit=50&sidePanel=submit-new-workflow`,
    },
  },
  {
    id: "brain-fast-fetch-full-indexing",
    tab: "sync-action",
    title: "Run fast fetch full indexing",
    subtitle: "wf-brain-fast-fetch-full-indexing",
    description: "Trigger the Brain fast fetch full indexing workflow for a cell and environment.",
    icon: "⚡",
    accent: "orange",
    picker: {
      fields: [
        {
          id: "environment",
          label: "Environment",
          options: ENVIRONMENTS,
        },
        {
          id: "cell",
          label: "Cell",
          options: CELLS.map((c) => ({ label: c, value: c })),
        },
      ],
      buildUrl: (v) =>
        `https://argoworkflows-${v.cell}.${v.environment}.omcomcom.com/workflows/wf-brain-fast-fetch-full-indexing?limit=50&sidePanel=submit-new-workflow`,
    },
  },
  {
    id: "screenit",
    tab: "sync-action",
    title: "Screen It",
    description: "Open the ScreenIt ArgoCD application for a cell (preprod only).",
    icon: "🕵️",
    accent: "orange",
    picker: {
      fields: [
        {
          id: "cell",
          label: "Cell",
          options: CELLS.map((c) => ({ label: c, value: c })),
        },
      ],
      buildUrl: (v) =>
        `https://argocd-${v.cell}.preprod.omcomcom.com/applications/screenit-preprod-${v.cell}?resource=`,
    },
  },
  {
    id: "teams-api-service",
    tab: "troubleshooting",
    title: "Teams API Service",
    subtitle: "This service is responsible for managing MS teams.",
    description: "Open the Teams API service docs for a cell (production).",
    icon: "👥",
    accent: "blue",
    picker: {
      fields: [
        {
          id: "cell",
          label: "Cell",
          options: CELLS.map((c) => ({ label: c, value: c })),
        },
      ],
      buildUrl: (v) => `https://teams-api-service-${v.cell}.production.omcomcom.com/docs#/`,
    },
  },
  {
    id: "teamit",
    tab: "troubleshooting",
    title: "TeamIT",
    subtitle: "This service is to help troubleshoot MS Teams related issues",
    description: "Open TeamIT for an account and environment.",
    icon: "🛠️",
    accent: "blue",
    picker: {
      fields: [
        {
          id: "environment",
          label: "Environment",
          options: ENVIRONMENTS,
        },
        {
          id: "accountId",
          label: "Account ID",
          type: "text",
          placeholder: "e.g. riotinto",
        },
      ],
      buildUrl: (v) =>
        `https://teamit.omcomcom.com/?accountId=${encodeURIComponent(v.accountId ?? "")}&env=${v.environment}`,
    },
    doc: {
      summary:
        "Teamit is an internal tool that helps diagnose and operate the HM–TA Collaborator and ECG products. It enables teams to inspect account data, validate configurations, manually trigger flows, and resolve issues through a controlled interface. All actions are audit-logged and include monitoring links for end-to-end traceability.",
      articleUrl: "https://confluence.workday.com/pages/viewpage.action?pageId=4355124428",
    },
  },
  {
    id: "bruno",
    tab: "troubleshooting",
    title: "Bruno",
    subtitle: "Run API requests via the Bruno MCP",
    description: "Write what you need, then copy it to Claude or Cursor to run it via the Bruno MCP.",
    icon: "🐻",
    accent: "orange",
    agentLaunch: {
      defaultPrompt:
        "Using the Bruno MCP tools (bruno_list_collections, bruno_list_requests, bruno_run_request/bruno_run_collection), help me find and run the right Bruno API request for this troubleshooting session. Ask me which collection/request and account/environment before running anything that mutates data.",
      agents: ["Claude", "Cursor"],
      note: "To log into Bruno itself, open the local Bruno desktop app and sign in.",
    },
  },
];
