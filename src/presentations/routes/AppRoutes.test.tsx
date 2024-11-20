import { render, waitFor } from "@testing-library/react";

import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";
import { RepositoryContextHelper, Router } from "@/tests";

import { AppRoutes } from "./AppRoutes";

describe("AppRoutes", () => {
  const run = (props: {
    path: string;
    gameRepository?: GameRepositoryInterface;
    scoreRepository?: ScoreRepositoryInterface;
  }) =>
    render(<AppRoutes />, {
      wrapper: ({ children }) => (
        <RepositoryContextHelper
          gameRepository={props.gameRepository}
          scoreRepository={props.scoreRepository}
        >
          <Router initPath={props.path}>{children}</Router>
        </RepositoryContextHelper>
      ),
    });

  describe(`パスが"/"の場合`, () => {
    it("Homeページが表示される", async () => {
      const gameRepository = new MockGameRepository();
      vi.spyOn(gameRepository, "getAllGames").mockResolvedValueOnce([]);

      await waitFor(() =>
        expect(
          run({ path: "/", gameRepository }).getByTestId("homePage"),
        ).toBeInTheDocument(),
      );
    });
  });

  describe(`パスが"/games/:id"の場合`, () => {
    it("PlayGameページが表示される", () => {
      expect(
        run({ path: "/games/123" }).getByTestId("playGamePage"),
      ).toBeInTheDocument();
    });
  });

  describe(`定義外のパスの場合`, () => {
    it("NotFoundページが表示される", () => {
      expect(
        run({ path: "/unknown" }).getByTestId("notFoundPage"),
      ).toBeInTheDocument();
    });
  });
});
