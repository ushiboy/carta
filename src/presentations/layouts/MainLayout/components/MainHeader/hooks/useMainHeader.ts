import { useMemo } from "react";
import { useLocation } from "react-router";

export function useMainHeader() {
  const { pathname } = useLocation();

  const navigation = useMemo(
    () => [
      { name: "Home", path: "/", current: /^\/$/.test(pathname) },
      {
        name: "Score",
        path: "/scores",
        current: /^\/scores\/?/.test(pathname),
      },
      {
        name: "Analysis",
        path: "/analysis",
        current: /^\/analysis\/?/.test(pathname),
      },
    ],
    [pathname],
  );
  const configNavigation = [{ name: "Manage Data", path: "/manage" }];

  return {
    navigation,
    configNavigation,
  };
}
