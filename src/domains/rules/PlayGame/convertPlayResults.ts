import {
  GameState,
  PlayResult,
  ToriFudaInfo,
  ToriFudaStatus,
} from "@/domains/models/carta";

import { ConvertPlayResults } from "./interface";

/**
 * 取札の状態からプレイ結果を取得する
 * @param state ゲームの状態
 * @returns プレイ結果リスト
 */
export const convertPlayResults: ConvertPlayResults = ({
  pairCards,
  toriFudas,
}: GameState): PlayResult[] => {
  const m = new Map<number, ToriFudaInfo>();
  toriFudas.forEach((t) => m.set(t.id, t));

  return pairCards.map((p) => ({
    ...p,
    corrected: m.get(p.id)?.status === ToriFudaStatus.Corrected,
  }));
};
