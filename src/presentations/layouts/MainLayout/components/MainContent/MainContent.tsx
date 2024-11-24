import { Outlet } from "react-router";

export function MainContent() {
  return (
    <div data-testid="mainContent" className="p-1">
      <Outlet />
    </div>
  );
}
