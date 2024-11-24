import { Game } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

import { GameList } from "./components/GameList";

type Props = {
  games: Game[];
  isLoading: boolean;
};

export function HomePage({ games, isLoading }: Props) {
  return (
    <div data-testid="homePage">
      <Loading show={isLoading} />
      <GameList games={games} />
    </div>
  );
}
