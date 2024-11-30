import { PageHeading, Stack } from "smarthr-ui";

import { Game } from "@/domains/models/carta";

import { GameList } from "./components/GameList";

type Props = {
  games: Game[];
  isLoading: boolean;
};

export function AnalysisGamesPage({ games, isLoading }: Props) {
  return (
    <Stack data-testid="analysisGamesPage">
      <PageHeading>分析</PageHeading>
      <GameList games={games} isLoading={isLoading} />
    </Stack>
  );
}
