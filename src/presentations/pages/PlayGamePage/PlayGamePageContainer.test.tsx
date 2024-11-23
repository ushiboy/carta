import { render, waitFor } from "@testing-library/react";

import { GameDetail } from "@/domains/models/carta";
import { MockTextToSpeechAdapter } from "@/infrastructures/adapters/TextToSpeechAdapter/MockTextToSpeechAdapter";
import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { AdapterContextProvider } from "@/presentations/contexts/AdapterContext";
import { RepositoryContextHelper, Router } from "@/tests";

import { PlayGamePageContainer } from "./PlayGamePageContainer";

describe("PlayGamePageContainer", () => {
  const base: GameDetail = {
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

  class Mock extends MockGameRepository {
    async getGameDetail(_gameId: number): Promise<GameDetail> {
      return base;
    }
  }

  const run = (gameRepository: GameRepositoryInterface) =>
    render(<PlayGamePageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper gameRepository={gameRepository}>
            <AdapterContextProvider
              textToSpeechAdapter={new MockTextToSpeechAdapter()}
            >
              <Router>{children}</Router>
            </AdapterContextProvider>
          </RepositoryContextHelper>
        );
      },
    });

  it("かるたゲームステージを表示する", async () => {
    const r = run(new Mock());
    await waitFor(() => expect(r.getByTestId("gameStage")).toBeInTheDocument());
  });
});
