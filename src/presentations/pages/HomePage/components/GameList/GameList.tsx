import { Game } from "@/domains/models/carta";

import { GameListItem } from "./components/GameListItem";

type Props = {
  games: Game[];
};

/**
 * かるたゲームリスト
 */
export function GameList({ games }: Props) {
  return (
    <ul data-testid="gameList" className="p-4 md:flex md:flex-wrap md:gap-4">
      {games.map((g) => (
        <GameListItem key={g.id} game={g} />
      ))}
    </ul>
  );
}
