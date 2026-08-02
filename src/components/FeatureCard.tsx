import { useState, type ReactNode } from "react";
import { tabs, accentIconClasses, type Feature } from "../features";
import { recordUsage } from "../lib/usageStats";
import PickerModal from "./PickerModal";
import AgentLaunchModal from "./AgentLaunchModal";
import InfoModal from "./InfoModal";

export default function FeatureCard({ feature }: { feature: Feature }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const tabLabel = tabs.find((t) => t.id === feature.tab)?.label;
  const doc = feature.doc ?? { summary: feature.description };

  const openInfo = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation();
    e.preventDefault();
    setInfoOpen(true);
  };

  const header = (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${accentIconClasses[feature.accent]}`}
        >
          {feature.icon}
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={openInfo}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openInfo(e);
          }}
          title="What is this for?"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-wdorange-500 dark:hover:text-wdorange-400 transition cursor-pointer"
        >
          💡
        </span>
      </div>
      {tabLabel && (
        <span className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 shrink-0">
          {tabLabel}
        </span>
      )}
    </div>
  );

  const rest = (
    <>
      <div className="font-medium text-gray-900 dark:text-white mt-3">{feature.title}</div>
      {feature.subtitle && (
        <div className="text-[11px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">
          {feature.subtitle}
        </div>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-1">{feature.description}</p>
      <span className="text-xs text-wdorange-600 dark:text-wdorange-400 font-medium mt-3 group-hover:underline">
        {feature.picker || feature.agentLaunch ? "Configure →" : "Open →"}
      </span>
    </>
  );

  let clickable: ReactNode;
  if (feature.agentLaunch) {
    clickable = (
      <button
        type="button"
        onClick={() => setAgentOpen(true)}
        className="w-full flex-1 flex flex-col text-left"
      >
        {header}
        {rest}
      </button>
    );
  } else if (feature.picker) {
    clickable = (
      <button
        type="button"
        onClick={() => setPickerOpen(true)}
        className="w-full flex-1 flex flex-col text-left"
      >
        {header}
        {rest}
      </button>
    );
  } else {
    clickable = (
      <a
        href={feature.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => recordUsage(feature.id)}
        className="flex-1 flex flex-col"
      >
        {header}
        {rest}
      </a>
    );
  }

  return (
    <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card hover:shadow-md hover:border-wdorange-200 dark:hover:border-wdorange-500/40 transition p-4 flex flex-col group">
      {clickable}
      {pickerOpen && <PickerModal feature={feature} onClose={() => setPickerOpen(false)} />}
      {agentOpen && <AgentLaunchModal feature={feature} onClose={() => setAgentOpen(false)} />}
      {infoOpen && <InfoModal feature={feature} doc={doc} onClose={() => setInfoOpen(false)} />}
    </div>
  );
}
