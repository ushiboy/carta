import { ScoreLog, Game, ScoreInfo } from "@/domains/models/carta";

import { ScoreRepositoryInterface } from "./ScoreRepository";

export class MockScoreRepository implements ScoreRepositoryInterface {
  getLatestScores(_limit: number): Promise<ScoreLog[]> {
    throw new Error("Method not implemented.");
  }
  saveScore(_game: Game, _score: ScoreInfo): Promise<ScoreLog> {
    throw new Error("Method not implemented.");
  }
}
