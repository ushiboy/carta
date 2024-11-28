import { AnalysisGamePage } from "./AnalysisGamePage";
import { useAnalysisGamePage } from "./hooks";

export function AnalysisGamePageContainer() {
  const { game, words, chart, wordsChart, isLoading } = useAnalysisGamePage();
  return (
    <AnalysisGamePage
      game={game}
      words={words}
      chart={chart}
      wordsChart={wordsChart}
      isLoading={isLoading}
    />
  );
}
