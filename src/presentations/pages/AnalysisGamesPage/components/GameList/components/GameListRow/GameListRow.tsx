import { Link } from "react-router";
import { Td, TextLink } from "smarthr-ui";

import { Game } from "@/domains/models/carta";

type Props = {
  game: Game;
};

export function GameListRow({ game }: Props) {
  return (
    <tr data-testid="gameListRow">
      <Td data-testid="title">
        <TextLink to={`/analysis/${game.id}`} elementAs={Link}>
          {game.title}
        </TextLink>
      </Td>
    </tr>
  );
}
