import { ToriFudaInfo, ToriFudaStatus } from "@/domains/models/carta";

import { ConvertPlayResults } from "./interface";

/**
 * 取札の状態からプレイ結果を取得する
 * @param pairCards 取札と読み札のペアリスト
 * @param toriFudas 取札の状態リスト
 * @returns プレイ結果リスト
 */
export const convertPlayResults: ConvertPlayResults = (
  pairCards,
  toriFudas,
) => {
  const m = new Map<number, ToriFudaInfo>();
  toriFudas.forEach((t) => m.set(t.id, t));

  return pairCards.map((p) => ({
    ...p,
    corrected: m.get(p.id)?.status === ToriFudaStatus.Corrected,
  }));
};
