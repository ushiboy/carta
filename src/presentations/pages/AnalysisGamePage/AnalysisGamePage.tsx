import { GameDetail } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

import { AnalysisGameContent } from "./components/AnalysisGameContent";

type Props = {
  game?: GameDetail;
  words: {
    text: string;
    value: number;
  }[];
  isLoading: boolean;
};

export function AnalysisGamePage({ game, words, isLoading }: Props) {
  return (
    <div data-testid="analysisGamePage">
      <Loading show={isLoading} />
      {game && <AnalysisGameContent words={words} />}
    </div>
  );
}
