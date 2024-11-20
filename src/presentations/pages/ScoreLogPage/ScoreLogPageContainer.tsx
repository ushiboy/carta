import { ScoreLogPage } from "./ScoreLogPage";
import { useScoreLogPage } from "./hooks";

export function ScoreLogPageContainer() {
  const { scores, isLoading } = useScoreLogPage();
  return <ScoreLogPage scores={scores} isLoading={isLoading} />;
}
