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

export interface ScoreLogTable {
  id?: number;
  gameId: number;
  title: string;
  corrected: number;
  total: number;
  results?: {
    id: number;
    yomi: string;
    tori: string;
    corrected: boolean;
  }[];
  createdAt: Date;
}

export class CartaDatabase extends Dexie {
  games!: Table<GameTable, number>;
  pairCards!: Table<PairCardTable, number>;
  scoreLogs!: Table<ScoreLogTable, number>;

  constructor() {
    super("CartaDatabase");
    this.version(3).stores({
      games: "++id, title, createdAt, modifiedAt",
      pairCards: "++id, gameId, yomi, tori, createdAt, modifiedAt",
      scoreLogs: "++id, gameId, title, corrected, total, results, createdAt",
    });
  }
}
