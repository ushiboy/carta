import { Link } from "react-router";
import { PageHeading, Stack, UpwardLink, useDevice } from "smarthr-ui";

import { PlayResult, ScoreLog } from "@/domains/models/carta";
import { formatDateTime } from "@/lib/formatDateTime";

import { ResultList } from "./components/ResultList";

type Props = {
  score?: ScoreLog;
  playResults: PlayResult[];
  isLoading: boolean;
};

export function ScoreAnalysisPage({ score, playResults, isLoading }: Props) {
  const { isNarrowView } = useDevice();
  return (
    <Stack data-testid="scoreAnalysisPage">
      <UpwardLink to="/scores" elementAs={Link} indent={!isNarrowView}>
        一覧に戻る
      </UpwardLink>
      {score && (
        <PageHeading data-testid="pageTitle">
          {score.title} - {formatDateTime(score.createdAt)}
        </PageHeading>
      )}
      <ResultList results={playResults} isLoading={isLoading} />
    </Stack>
  );
}
