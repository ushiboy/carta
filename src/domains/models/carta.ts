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
