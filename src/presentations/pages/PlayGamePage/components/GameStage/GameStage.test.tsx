import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartaEngine } from "@/domains/engines/CartaEngine/CartaEngine";
import {
  Game,
  GameDetail,
  PairCard,
  PlayResult,
  ScoreInfo,
  ScoreLog,
} from "@/domains/models/carta";
import { MockTextToSpeechAdapter } from "@/infrastructures/adapters/TextToSpeechAdapter/MockTextToSpeechAdapter";
import { MockScoreRepository } from "@/infrastructures/repositories/ScoreRepository/MockScoreRepository";
import { AdapterContextProvider } from "@/presentations/contexts/AdapterContext";
import { RepositoryContextHelper, Router } from "@/tests";

import { GameStage } from "./GameStage";

describe("GameStage", () => {
  // 札ペア1
  const pairCard1: PairCard = {
    id: 1,
    yomi: "hello",
    tori: "world",
  };

  const detail: GameDetail = {
    id: 1,
    title: "test",
    pairCards: [pairCard1],
  };

  const engine = new CartaEngine([pairCard1]);

  class Mock extends MockScoreRepository {
    async saveScore(
      game: Game,
      _score: ScoreInfo,
      _playResults: PlayResult[],
    ): Promise<ScoreLog> {
      return {
        id: 1,
        gameId: game.id,
        title: game.title,
        corrected: _score.corrected,
        total: _score.total,
        createdAt: new Date(),
      };
    }
  }

  const run = () =>
    render(<GameStage game={detail} engine={engine} />, {
      wrapper: ({ children }) => (
        <RepositoryContextHelper scoreRepository={new Mock()}>
          <AdapterContextProvider
            textToSpeechAdapter={new MockTextToSpeechAdapter()}
          >
            <Router initPath="">{children}</Router>
          </AdapterContextProvider>
        </RepositoryContextHelper>
      ),
    });

  it("titleが表示される", () => {
    const r = run();
    expect(r.getByTestId("title")).toHaveTextContent(detail.title);
  });

  it("読み札が表示される", async () => {
    const r = run();
    await waitFor(() =>
      expect(r.getByTestId("yomiFuda")).toHaveTextContent(pairCard1.yomi),
    );
  });

  it("取り札が表示される", async () => {
    const r = run();
    await waitFor(() => expect(r.getByTestId("toriFuda")).toBeInTheDocument());
  });

  it("ゲーム終了するとゲームオーバーダイアログが表示される", async () => {
    const r = run();
    await waitFor(() =>
      expect(r.getByTestId("toriFuda")).toHaveTextContent(pairCard1.tori),
    );
    await userEvent.click(r.getByText(pairCard1.tori));

    await waitFor(() =>
      expect(r.getByTestId("gameOverDialog")).toBeInTheDocument(),
    );
  });
});
