import { GameDetail } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

import { AnalysisGameContent } from "./components/AnalysisGameContent";
import { DailyResultsChart } from "./components/DailyResultsChart";
import { WeakPointChart } from "./components/WeakPointChart";

type Props = {
  game?: GameDetail;
  words: {
    text: string;
    value: number;
  }[];
  chart: {
    labels: string[];
    corrected: number[];
    incorrected: number[];
  };
  wordsChart: {
    labels: string[];
    corrected: number[];
    incorrected: number[];
  };
  isLoading: boolean;
};

export function AnalysisGamePage({
  game,
  words,
  chart,
  wordsChart,
  isLoading,
}: Props) {
  return (
    <div data-testid="analysisGamePage">
      <Loading show={isLoading} />
      {game && (
        <div>
          <DailyResultsChart {...chart} />
          <AnalysisGameContent words={words} />
          <WeakPointChart {...wordsChart} />
        </div>
      )}
    </div>
  );
}
