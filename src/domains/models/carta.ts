export type Game = {
  id: number;
  title: string;
};

export type GameDetail = {
  id: number;
  title: string;
  pairCards: PairCard[];
};

export type PairCard = {
  yomi: string;
  tori: string;
};
