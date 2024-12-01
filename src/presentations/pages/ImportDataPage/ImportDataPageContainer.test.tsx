import { render, waitFor } from "@testing-library/react";
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
      r.queryByTestId("buttonImport"),
      "ファイルが未選択のためボタンは非表示",
    ).toBeNull();

    await userEvent.upload(
      r.getByTestId("inputCsvFile"),
      new File(["yomi1,tori1"], "test.csv"),
    );

    await waitFor(() =>
      expect(
        r.getByTestId("inputTitle"),
        "CSVのファイル名が設定される",
      ).toHaveValue("test"),
    );

    await waitFor(() => expect(r.getByTestId("buttonImport")).toBeEnabled());

    await userEvent.click(r.getByTestId("buttonImport"));

    expect(alertMock).toHaveBeenCalledWith(`testを登録しました。`);
  });
});
