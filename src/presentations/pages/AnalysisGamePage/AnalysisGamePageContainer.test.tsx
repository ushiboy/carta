import { render, waitFor } from "@testing-library/react";

import { GameDetail, PlayResult, ScoreLog } from "@/domains/models/carta";
import { MockTextToSpeechAdapter } from "@/infrastructures/adapters/TextToSpeechAdapter/MockTextToSpeechAdapter";
import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { MockScoreRepository } from "@/infrastructures/repositories/ScoreRepository/MockScoreRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";
import { AdapterContextProvider } from "@/presentations/contexts/AdapterContext";
import { RepositoryContextHelper, Router } from "@/tests";

import { AnalysisGamePageContainer } from "./AnalysisGamePageContainer";

describe("AnalysisGamePageContainer", () => {
  const game: GameDetail = {
    id: 1,
    title: "test",
    pairCards: [
      {
        id: 1,
        yomi: "hello",
        tori: "world",
      },
    ],
  };

  const score: ScoreLog = {
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

  class MockGame extends MockGameRepository {
    async getGameDetail(_gameId: number): Promise<GameDetail> {
      return game;
    }
  }

  class MockScore extends MockScoreRepository {
    async getScoreDetails(
      _gameId: number,
    ): Promise<{ score: ScoreLog; playResults: PlayResult[] }[]> {
      return [
        {
          score,
          playResults: [result],
        },
      ];
    }
  }

  const run = (
    gameRepository: GameRepositoryInterface,
    scoreRepository: ScoreRepositoryInterface,
  ) =>
    render(<AnalysisGamePageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper
            gameRepository={gameRepository}
            scoreRepository={scoreRepository}
          >
            <AdapterContextProvider
              textToSpeechAdapter={new MockTextToSpeechAdapter()}
            >
              <Router>{children}</Router>
            </AdapterContextProvider>
          </RepositoryContextHelper>
        );
      },
    });

  it("分析ページのコンテンツを表示する", async () => {
    const r = run(new MockGame(), new MockScore());
    await waitFor(() => {
      expect(
        r.getByTestId("dailyResultsChart"),
        "日毎の結果グラフが表示されること",
      ).toBeInTheDocument();
      expect(
        r.getByTestId("analysisGameContent"),
        "ワードクラウドが表示されること",
      ).toBeInTheDocument();
      expect(
        r.getByTestId("weakPointChart"),
        "弱点分析グラフが表示されること",
      ).toBeInTheDocument();
    });
  });
});
