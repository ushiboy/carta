import { PageHeading, Stack } from "smarthr-ui";

import { ScoreLog } from "@/domains/models/carta";

import { ScoreList } from "./components/ScoreList";

type Props = {
  scores: ScoreLog[];
  isLoading: boolean;
};

export function ScoreLogPage({ scores, isLoading }: Props) {
  return (
    <Stack data-testid="scoreLogPage">
      <PageHeading>スコア</PageHeading>
      <ScoreList scores={scores} isLoading={isLoading} />
    </Stack>
  );
}
