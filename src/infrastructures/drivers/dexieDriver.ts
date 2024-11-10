import Dexie, { Table } from "dexie";

export interface GameTable {
  id?: number;
  title: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface PairCardTable {
  id?: number;
  gameId: number;
  yomi: string;
  tori: string;
  createdAt: Date;
  modifiedAt: Date;
}

export class CartaDatabase extends Dexie {
  games!: Table<GameTable, number>;
  pairCards!: Table<PairCardTable, number>;

  constructor() {
    super("CartaDatabase");
    this.version(1).stores({
      games: "++id, title, createdAt, modifiedAt",
      pairCards: "++id, gameId, yomi, tori, createdAt, modifiedAt",
    });
  }
}
