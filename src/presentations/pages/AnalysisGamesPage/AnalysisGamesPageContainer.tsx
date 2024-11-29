import { AnalysisGamesPage } from "./AnalysisGamesPage";
import { useAnalysisGamePage } from "./hooks/useAnalysisGamesPage";

export function AnalysisGamesPageContainer() {
  const { games, isLoading } = useAnalysisGamePage();

  return <AnalysisGamesPage games={games} isLoading={isLoading} />;
}
