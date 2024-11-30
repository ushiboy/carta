import { render } from "@testing-library/react";

import { Game } from "@/domains/models/carta";
import { Router } from "@/tests";

import { GameListRow } from "./GameListRow";

describe("GameListRow", () => {
  const game: Game = {
    id: 1,
    title: "test",
  };

  const run = (game: Game) =>
    render(<GameListRow game={game} />, {
      wrapper: ({ children }) => (
        <Router>
          <table>
            <tbody>{children}</tbody>
          </table>
        </Router>
      ),
    });

  it("titleが表示される", () => {
    const r = run(game);
    expect(r.getByTestId("title")).toHaveTextContent(game.title);
  });
});
