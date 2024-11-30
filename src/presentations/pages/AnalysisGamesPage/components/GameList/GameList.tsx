import { Base, EmptyTableBody, Table, Th, Text, Loader } from "smarthr-ui";

import { Game } from "@/domains/models/carta";

import { GameListRow } from "./components/GameListRow";

type Props = {
  games: Game[];
  isLoading: boolean;
};

export function GameList({ games, isLoading }: Props) {
  return (
    <Base overflow="auto">
      <Table>
        <thead>
          <tr>
            <Th>タイトル</Th>
          </tr>
        </thead>
        {games.length > 0 ? (
          <tbody>
            {games.map((g) => (
              <GameListRow key={g.id} game={g} />
            ))}
          </tbody>
        ) : (
          <EmptyTableBody>
            {isLoading ? (
              <Loader data-testid="loading" size="s" alt="読み込み中" />
            ) : (
              <Text data-testid="empty" as="p">
                かるたがありません。
              </Text>
            )}
          </EmptyTableBody>
        )}
      </Table>
    </Base>
  );
}
