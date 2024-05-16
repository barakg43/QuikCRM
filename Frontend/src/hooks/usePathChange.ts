import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePathChange(action: () => void) {
  const location = useLocation();
  const [oldPath, setOldPath] = useState("");
  const newPath = location.pathname.split("?")[0];
  useEffect(() => {
    if (oldPath !== newPath) {
      action();
      setOldPath(newPath);
    }
  }, [action, newPath, oldPath]);
}
