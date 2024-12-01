import { useMemo } from "react";
import { useLocation } from "react-router";

export function useMainHeader() {
  const { pathname } = useLocation();

  const navigation = useMemo(
    () => [
      { name: "ホーム", path: "/", current: /^\/$/.test(pathname) },
      {
        name: "スコア",
        path: "/scores",
        current: /^\/scores\/?/.test(pathname),
      },
      {
        name: "分析",
        path: "/analysis",
        current: /^\/analysis\/?/.test(pathname),
      },
    ],
    [pathname],
  );
  const configNavigation = [{ name: "CSVインポート", path: "/manage" }];

  return {
    navigation,
    configNavigation,
  };
}
