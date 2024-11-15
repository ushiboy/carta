import { Outlet } from "react-router";

export function MainContent() {
  return (
    <div
      data-testid="mainContent"
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <Outlet />
    </div>
  );
}
