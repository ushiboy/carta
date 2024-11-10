import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

import { GameRepository } from "./GameRepository";

describe("GameRepository", () => {
  let db: CartaDatabase;
  let repository: GameRepository;

  beforeEach(async () => {
    db = new CartaDatabase();
    repository = new GameRepository(db);
    const gameId1 = await db.games.add({
      title: "test 1",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    const gameId2 = await db.games.add({
      title: "test 2",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    await db.pairCards.bulkAdd([
      {
        gameId: gameId1,
        yomi: "yomi1",
        tori: "tori1",
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
      {
        gameId: gameId2,
        yomi: "yomi2",
        tori: "tori2",
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    ]);
  });

  describe("getAllGames", () => {
    it("すべてのゲームを返す", async () => {
      expect(await repository.getAllGames()).toEqual([
        {
          id: 1,
          title: "test 1",
        },
        {
          id: 2,
          title: "test 2",
        },
      ]);
    });
  });

  describe("getGameDetail", () => {
    describe("対象が存在する場合", () => {
      it("指定IDのゲームを返す", async () => {
        expect(await repository.getGameDetail(1)).toEqual({
          id: 1,
          title: "test 1",
          pairCards: [{ yomi: "yomi1", tori: "tori1" }],
        });
      });
    });

    describe("対象が存在しない場合", () => {
      it("エラーとする", async () => {
        await expect(repository.getGameDetail(9999)).rejects.toThrowError(
          new Error("Game not found."),
        );
      });
    });
  });
});
