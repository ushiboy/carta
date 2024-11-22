import { useLocation } from "react-router";

export function useMainHeader() {
  const { pathname } = useLocation();

  const navigation = [
    { name: "Home", path: "/", current: /^\/$/.test(pathname) },
    { name: "Score", path: "/scores", current: /^\/scores\/?/.test(pathname) },
  ];
  const configNavigation = [{ name: "Manage Data", path: "/manage" }];

  return {
    navigation,
    configNavigation,
  };
}
