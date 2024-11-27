import { AnalysisGamePage } from "./AnalysisGamePage";
import { useAnalysisGamePage } from "./hooks";

export function AnalysisGamePageContainer() {
  const { game, words, isLoading } = useAnalysisGamePage();
  return <AnalysisGamePage game={game} words={words} isLoading={isLoading} />;
}
