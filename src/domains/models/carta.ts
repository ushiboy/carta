export type GameDraft = {
  title: string;
  pairDrafts: PairDraft[];
};

export type PairDraft = {
  yomi: string;
  tori: string;
};

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
  id: number;
  yomi: string;
  tori: string;
};

/**
 * 取札のステータス
 *
 * 初期は Default
 * 読み札の回答として
 * 1. 正解した場合、取札がCorrectedになる
 * 2. 不正解した場合、取札がIncorrectedになる
 */
export const ToriFudaStatus = {
  /** 通常 */
  Default: 1,
  /** 正解した札 */
  Corrected: 2,
  /** 不正解した札 */
  Incorrected: 3,
} as const;
export type ToriFudaStatus =
  (typeof ToriFudaStatus)[keyof typeof ToriFudaStatus];

export type ToriFudaInfo = {
  id: number;
  text: string;
  status: ToriFudaStatus;
};

export type YomiFudaInfo = {
  id: number;
  text: string;
};

export type ScoreInfo = {
  /** 正答率 */
  rate: number;
  /** 正答数 */
  corrected: number;
  /** 誤答数 */
  incorrected: number;
  /** トータル */
  total: number;
};

export type ScoreLog = {
  id: number;
  gameId: number;
  title: string;
  /** 正答数 */
  corrected: number;
  /** トータル */
  total: number;
  createdAt: Date;
};

export type PlayResult = {
  id: number;
  yomi: string;
  tori: string;
  corrected: boolean;
};
