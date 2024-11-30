import { render, waitFor } from "@testing-library/react";

import { Game } from "@/domains/models/carta";
import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { RepositoryContextHelper, Router } from "@/tests";

import { AnalysisGamesPageContainer } from "./AnalysisGamesPageContainer";

describe("AnalysisGamesPageContainer", () => {
  const base: Game = {
    id: 1,
    title: "test",
  };

  class Mock extends MockGameRepository {
    async getAllGames(): Promise<Game[]> {
      return [base];
    }
  }

  const run = (gameRepository: GameRepositoryInterface) =>
    render(<AnalysisGamesPageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper gameRepository={gameRepository}>
            <Router>{children}</Router>
          </RepositoryContextHelper>
        );
      },
    });

  it("かるたを一覧で表示する", async () => {
    const r = run(new Mock());
    await waitFor(() =>
      expect(r.getAllByTestId("gameListRow")).toHaveLength(1),
    );
  });
});
