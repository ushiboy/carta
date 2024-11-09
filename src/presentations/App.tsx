import { HashRouter } from "react-router-dom";

import { AppRoutes } from "@/presentations/routes/AppRoutes";

export function App() {
  return (
    <HashRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <AppRoutes />
    </HashRouter>
  );
}
