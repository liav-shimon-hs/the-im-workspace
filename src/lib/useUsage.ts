import { useEffect, useState } from "react";
import { getUsage, type UsageMap } from "./usageStats";

export function useUsage(): UsageMap {
  const [usage, setUsage] = useState<UsageMap>(() => getUsage());

  useEffect(() => {
    const onChange = () => setUsage(getUsage());
    window.addEventListener("pm-dashboard:usage-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("pm-dashboard:usage-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return usage;
}
