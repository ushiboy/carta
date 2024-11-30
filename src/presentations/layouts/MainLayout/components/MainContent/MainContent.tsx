import { Outlet } from "react-router";

export function MainContent() {
  return (
    <div data-testid="mainContent" className="p-4 md:p-8">
      <Outlet />
    </div>
  );
}
