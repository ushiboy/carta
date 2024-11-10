import { Game, GameDetail } from "@/domains/models/carta";

import { GameRepositoryInterface } from "./GameRepository";

export class MockGameRepository implements GameRepositoryInterface {
  getAllGames(): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }
  getGameDetail(_gameId: number): Promise<GameDetail> {
    throw new Error("Method not implemented.");
  }
}
