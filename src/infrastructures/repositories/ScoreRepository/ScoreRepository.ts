import { Game, ScoreInfo, ScoreLog } from "@/domains/models/carta";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

export interface ScoreRepositoryInterface {
  getLatestScores(limit: number): Promise<ScoreLog[]>;

  saveScore(game: Game, score: ScoreInfo): Promise<ScoreLog>;
}

export class ScoreRepository implements ScoreRepositoryInterface {
  constructor(private db: CartaDatabase) {}

  async getLatestScores(limit: number): Promise<ScoreLog[]> {
    const raws = await this.db.scoreLogs
      .orderBy("createdAt")
      .reverse()
      .limit(limit)
      .toArray();

    return raws.map((r) => ({
      ...r,
      id: r.id!,
    }));
  }

  async saveScore(game: Game, score: ScoreInfo): Promise<ScoreLog> {
    const id = await this.db.scoreLogs.add({
      gameId: game.id,
      title: game.title,
      corrected: score.corrected,
      total: score.total,
      createdAt: new Date(),
    });
    const saved = await this.db.scoreLogs.get(id);

    if (!saved) {
      throw new Error("Score not found.");
    }

    return {
      ...saved,
      id: saved.id!,
    };
  }
}
