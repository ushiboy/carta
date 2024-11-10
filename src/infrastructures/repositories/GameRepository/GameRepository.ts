import { Game, GameDetail } from "@/domains/models/carta";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

export interface GameRepositoryInterface {
  getAllGames(): Promise<Game[]>;

  getGameDetail(gameId: number): Promise<GameDetail>;
}

export class GameRepository implements GameRepositoryInterface {
  constructor(private db: CartaDatabase) {}

  async getAllGames(): Promise<Game[]> {
    const games = await this.db.games.toArray();
    return games.map(({ id, title }) => ({
      id: id!,
      title,
    }));
  }

  async getGameDetail(gameId: number): Promise<GameDetail> {
    const game = await this.db.games.get(gameId);

    if (!game) {
      throw new Error("Game not found.");
    }

    const pairCards = await this.db.pairCards
      .where("gameId")
      .equals(gameId)
      .toArray();

    return {
      id: game.id!,
      title: game.title,
      pairCards: pairCards.map(({ yomi, tori }) => ({ yomi, tori })),
    };
  }
}
