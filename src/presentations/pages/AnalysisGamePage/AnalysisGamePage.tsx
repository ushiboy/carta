import { Link } from "react-router";
import {
  Base,
  Loader,
  PageHeading,
  Stack,
  UpwardLink,
  useDevice,
} from "smarthr-ui";

import { GameDetail } from "@/domains/models/carta";

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
  const { isNarrowView } = useDevice();
  return (
    <Stack data-testid="analysisGamePage">
      <UpwardLink to="/analysis" elementAs={Link} indent={!isNarrowView}>
        一覧に戻る
      </UpwardLink>
      {isLoading && <Loader alt="読み込み中" />}
      {game && (
        <>
          <PageHeading data-testid="pageTitle">{game.title}</PageHeading>
          <Base padding={1}>
            <Stack gap={1.5}>
              <DailyResultsChart {...chart} />
              <AnalysisGameContent words={words} />
              <WeakPointChart {...wordsChart} />
            </Stack>
          </Base>
        </>
      )}
    </Stack>
  );
}
