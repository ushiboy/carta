import { Game, PlayResult, ScoreInfo } from "@/domains/models/carta";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

import { ScoreRepository } from "./ScoreRepository";

describe("ScoreRepository", () => {
  let db: CartaDatabase;
  let repository: ScoreRepository;

  const game1: Game = {
    id: 1,
    title: "game1",
  };

  const score1: ScoreInfo = {
    rate: 100,
    corrected: 100,
    incorrected: 0,
    total: 1,
  };

  const playResult1: PlayResult = {
    id: 1,
    yomi: "yomi1",
    tori: "tori1",
    corrected: true,
  };

  beforeEach(async () => {
    db = new CartaDatabase();
    repository = new ScoreRepository(db);
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getScoreDetail", () => {
    describe("対象が存在する場合", () => {
      beforeEach(async () => {
        await db.scoreLogs.add({
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          results: [playResult1],
          createdAt: new Date("2024-01-01"),
        });
      });

      it("スコアの詳細を返す", async () => {
        expect(await repository.getScoreDetail(1)).toEqual({
          score: {
            id: 1,
            gameId: game1.id,
            title: game1.title,
            corrected: score1.corrected,
            total: score1.total,
            createdAt: new Date("2024-01-01"),
          },
          playResults: [playResult1],
        });
      });
    });

    describe("対象が存在しない場合", () => {
      it("エラーとする", async () => {
        await expect(repository.getScoreDetail(9999)).rejects.toThrowError(
          new Error("Score not found."),
        );
      });
    });
  });

  describe("getLatestScores", () => {
    beforeEach(async () => {
      await db.scoreLogs.bulkAdd([
        {
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          results: [playResult1],
          createdAt: new Date("2024-01-01"),
        },
        {
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          results: [playResult1],
          createdAt: new Date("2024-01-02"),
        },
        {
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          results: [playResult1],
          createdAt: new Date("2024-01-03"),
        },
      ]);
    });

    it("指定件数までのスコアを作成日の降順で返す", async () => {
      expect(await repository.getLatestScores(2)).toEqual([
        {
          id: 3,
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          createdAt: new Date("2024-01-03"),
        },
        {
          id: 2,
          gameId: game1.id,
          title: game1.title,
          corrected: score1.corrected,
          total: score1.total,
          createdAt: new Date("2024-01-02"),
        },
      ]);
    });
  });

  describe("saveScore", () => {
    it("スコアを保存し結果を返す", async () => {
      const result = await repository.saveScore(game1, score1, [playResult1]);
      expect(result.id).toBe(1);
      expect(result.gameId).toBe(game1.id);
      expect(result.title).toBe(game1.title);
      expect(result.corrected).toBe(score1.corrected);
      expect(result.total).toBe(score1.total);
    });
  });
});
