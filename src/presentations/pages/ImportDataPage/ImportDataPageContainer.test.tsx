import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameDetail, GameDraft } from "@/domains/models/carta";
import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { RepositoryContextHelper, Router } from "@/tests";

import { ImportDataPageContainer } from "./ImportDataPageContainer";

describe("ImportDataPageContainer", () => {
  class Mock extends MockGameRepository {
    async createGame(draft: GameDraft): Promise<GameDetail> {
      return {
        id: 1,
        title: draft.title,
        pairCards: draft.pairDrafts.map(({ yomi, tori }, i) => ({
          id: i,
          yomi,
          tori,
        })),
      };
    }
  }

  const run = (gameRepository: GameRepositoryInterface) =>
    render(<ImportDataPageContainer />, {
      wrapper({ children }) {
        return (
          <RepositoryContextHelper gameRepository={gameRepository}>
            <Router>{children}</Router>
          </RepositoryContextHelper>
        );
      },
    });

  it("CSVファイルをインポートできる", async () => {
    const alertMock = vi.spyOn(window, "alert");
    const r = run(new Mock());

    expect(
      r.getByTestId("buttonImport"),
      "必須項目が不足しているためボタンは無効",
    ).toBeDisabled();

    await userEvent.type(r.getByTestId("inputTitle"), "game");
    expect(
      r.getByTestId("buttonImport"),
      "ファイルが不足しているためボタンは無効",
    ).toBeDisabled();

    await userEvent.upload(
      r.getByTestId("inputCsvFile"),
      new File(["yomi1,tori1"], "test.csv"),
    );

    expect(r.getByTestId("buttonImport")).toBeEnabled();

    await userEvent.click(r.getByTestId("buttonImport"));

    expect(alertMock).toHaveBeenCalledWith(`gameを登録しました。`);
  });
});
