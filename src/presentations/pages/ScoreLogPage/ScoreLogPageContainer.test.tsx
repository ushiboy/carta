import { render, waitFor } from "@testing-library/react";

import { ScoreLog } from "@/domains/models/carta";
import { MockScoreRepository } from "@/infrastructures/repositories/ScoreRepository/MockScoreRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";
import { RepositoryContextHelper, Router } from "@/tests";

import { ScoreLogPageContainer } from "./ScoreLogPageContainer";

describe("ScoreLogPageContainer", () => {
  const base: ScoreLog = {
    id: 1,
    gameId: 1000,
    title: "test",
    corrected: 100,
    total: 100,
    createdAt: new Date(),
  };

  class Mock extends MockScoreRepository {
    async getLatestScores(_limit: number): Promise<ScoreLog[]> {
      return [base];
    }
  }

  const run = (scoreRepository: ScoreRepositoryInterface) =>
    render(<ScoreLogPageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper scoreRepository={scoreRepository}>
            <Router>{children}</Router>
          </RepositoryContextHelper>
        );
      },
    });

  it("スコアを一覧で表示する", async () => {
    const r = run(new Mock());
    await waitFor(() =>
      expect(r.getAllByTestId("scoreListRow")).toHaveLength(1),
    );
  });
});
