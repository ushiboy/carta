import { Game, PlayResult, ScoreInfo, ScoreLog } from "@/domains/models/carta";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

export interface ScoreRepositoryInterface {
  getLatestScores(limit: number): Promise<ScoreLog[]>;

  getScoreDetail(id: number): Promise<{
    score: ScoreLog;
    playResults: PlayResult[];
  }>;

  saveScore(
    game: Game,
    score: ScoreInfo,
    playResults: PlayResult[],
  ): Promise<ScoreLog>;
}

export class ScoreRepository implements ScoreRepositoryInterface {
  constructor(private db: CartaDatabase) {}

  async getScoreDetail(id: number): Promise<{
    score: ScoreLog;
    playResults: PlayResult[];
  }> {
    const score = await this.db.scoreLogs.get(id);

    if (!score) {
      throw new Error("Score not found.");
    }

    const { results, ...other } = score;
    return {
      score: {
        ...other,
        id: score.id!,
      },
      playResults: results || [],
    };
  }

  async getLatestScores(limit: number): Promise<ScoreLog[]> {
    const raws = await this.db.scoreLogs
      .orderBy("createdAt")
      .reverse()
      .limit(limit)
      .toArray();

    return raws.map((r) => {
      const { results: _, ...other } = r;
      return {
        ...other,
        id: r.id!,
      };
    });
  }

  async saveScore(
    game: Game,
    score: ScoreInfo,
    playResults: PlayResult[],
  ): Promise<ScoreLog> {
    const id = await this.db.scoreLogs.add({
      gameId: game.id,
      title: game.title,
      corrected: score.corrected,
      total: score.total,
      results: playResults,
      createdAt: new Date(),
    });
    const saved = await this.db.scoreLogs.get(id);

    return {
      ...saved!,
      id: saved!.id!,
    };
  }
}
