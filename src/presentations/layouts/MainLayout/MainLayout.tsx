import { MainContent } from "./components/MainContent";
import { MainHeader } from "./components/MainHeader";

export function MainLayout() {
  return (
    <div data-testid="mainLayout">
      <MainHeader />
      <MainContent />
    </div>
  );
}
