import { ScoreAnalysisPage } from "./ScoreAnalysisPage";
import { useScoreAnalysisPage } from "./hooks";

export function ScoreAnalysisPageContainer() {
  const { score, playResults, isLoading } = useScoreAnalysisPage();
  return (
    <ScoreAnalysisPage
      score={score}
      playResults={playResults}
      isLoading={isLoading}
    />
  );
}
