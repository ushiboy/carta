import { render } from "@testing-library/react";

import { Game } from "@/domains/models/carta";
import { Router } from "@/tests";

import { GameList } from "./GameList";

type Props = React.ComponentProps<typeof GameList>;

describe("GameList", () => {
  const game: Game = {
    id: 1,
    title: "test",
  };

  const run = (props: Props) =>
    render(<GameList {...props} />, {
      wrapper: ({ children }) => <Router>{children}</Router>,
    });

  describe("isLoading", () => {
    describe("trueの場合", () => {
      it("ローディングが表示される", () => {
        const r = run({ games: [], isLoading: true });
        expect(r.getByTestId("loading")).toBeInTheDocument();
      });
    });

    describe("falseの場合", () => {
      it("ローディングが表示されない", () => {
        const r = run({ games: [], isLoading: false });
        expect(r.queryByTestId("loading")).toBeNull();
      });
    });
  });

  describe("games", () => {
    describe("空の場合", () => {
      it("存在しない旨のメッセージが表示される", () => {
        const r = run({ games: [], isLoading: false });
        expect(r.getByTestId("empty")).toHaveTextContent(
          "かるたがありません。",
        );
      });
    });

    describe("空ではない場合", () => {
      it("件数分の行が表示される", () => {
        const games = [game, { ...game, id: 2 }];
        const r = run({ games, isLoading: false });
        expect(r.queryAllByTestId("gameListRow")).toHaveLength(2);
      });
    });
  });
});
