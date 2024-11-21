import { ScoreLog, Game, ScoreInfo, PlayResult } from "@/domains/models/carta";

import { ScoreRepositoryInterface } from "./ScoreRepository";

export class MockScoreRepository implements ScoreRepositoryInterface {
  getLatestScores(_limit: number): Promise<ScoreLog[]> {
    throw new Error("Method not implemented.");
  }
  getScoreDetail(
    _id: number,
  ): Promise<{ score: ScoreLog; playResults: PlayResult[] }> {
    throw new Error("Method not implemented.");
  }
  saveScore(
    _game: Game,
    _score: ScoreInfo,
    _playResults: PlayResult[],
  ): Promise<ScoreLog> {
    throw new Error("Method not implemented.");
  }
}
