import { useEffect, useState } from "react";
import { changelog } from "../changelog";
import { getUnseenCount } from "./notifications";

const allIds = changelog.map((c) => c.id);

export function useUnseenCount(): number {
  const [count, setCount] = useState(() => getUnseenCount(allIds));

  useEffect(() => {
    const onChange = () => setCount(getUnseenCount(allIds));
    window.addEventListener("pm-dashboard:notifications-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("pm-dashboard:notifications-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return count;
}
