import { ToriFudaStatus } from "@/domains/models/carta";

import { CalculateScore } from "./interface";

/**
 * ゲームの状態からスコアを取得する
 * @param toriFudas 取札の状態
 * @returns スコア
 */
export const calculateScore: CalculateScore = (toriFudas) => {
  const corrected = toriFudas.reduce((result, fuda) => {
    if (fuda.status === ToriFudaStatus.Corrected) {
      result += 1;
    }
    return result;
  }, 0);
  const total = toriFudas.length;
  const incorrected = total - corrected;

  return {
    rate: Math.floor((corrected / total) * 100),
    corrected,
    incorrected,
    total,
  };
};
