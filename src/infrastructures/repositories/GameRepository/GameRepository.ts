import { GameDraft, Game, GameDetail } from "@/domains/models/carta";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";

export interface GameRepositoryInterface {
  getAllGames(): Promise<Game[]>;

  getGameDetail(gameId: number): Promise<GameDetail>;

  createGame(draft: GameDraft): Promise<GameDetail>;
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
      pairCards: pairCards.map(({ id, yomi, tori }) => ({
        id: id!,
        yomi,
        tori,
      })),
    };
  }

  async createGame(draft: GameDraft): Promise<GameDetail> {
    const gameId = await this.db.games.add({
      title: draft.title,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    await this.db.pairCards.bulkAdd(
      draft.pairDrafts.map(({ yomi, tori }) => ({
        gameId,
        yomi,
        tori,
        createdAt: new Date(),
        modifiedAt: new Date(),
      })),
    );

    return this.getGameDetail(gameId);
  }
}
