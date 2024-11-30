import { render, waitFor } from "@testing-library/react";

import { PlayResult, ScoreLog } from "@/domains/models/carta";
import { MockScoreRepository } from "@/infrastructures/repositories/ScoreRepository/MockScoreRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";
import { formatDateTime } from "@/lib/formatDateTime";
import { RepositoryContextHelper, Router } from "@/tests";

import { ScoreAnalysisPageContainer } from "./ScoreAnalysisPageContainer";

describe("ScoreAnalysisPageContainer", () => {
  const base: ScoreLog = {
    id: 1,
    gameId: 1000,
    title: "test",
    corrected: 100,
    total: 100,
    createdAt: new Date(),
  };

  const result: PlayResult = {
    id: 1,
    yomi: "yomi1",
    tori: "tori1",
    corrected: true,
  };

  class Mock extends MockScoreRepository {
    async getScoreDetail(
      _id: number,
    ): Promise<{ score: ScoreLog; playResults: PlayResult[] }> {
      return {
        score: base,
        playResults: [result],
      };
    }
  }

  const run = (scoreRepository: ScoreRepositoryInterface) =>
    render(<ScoreAnalysisPageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper scoreRepository={scoreRepository}>
            <Router>{children}</Router>
          </RepositoryContextHelper>
        );
      },
    });

  it('titleとcreatedAtを"title - yyyy/MM/dd"で表示する', async () => {
    const r = run(new Mock());
    await waitFor(() =>
      expect(r.getByTestId("pageTitle")).toHaveTextContent(
        `${base.title} - ${formatDateTime(base.createdAt)}`,
      ),
    );
  });

  it("プレイ結果を一覧で表示する", async () => {
    const r = run(new Mock());
    await waitFor(() =>
      expect(r.getAllByTestId("resultListRow")).toHaveLength(1),
    );
  });
});
