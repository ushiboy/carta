import {
  GameState,
  ToriFudaInfo,
  ToriFudaStatus,
} from "@/domains/models/carta";

import { calculateScore } from "./calculateScore";
import { convertPlayResults } from "./convertPlayResults";
import { TakeCard } from "./interface";

/**
 * 取札を指定してゲームを次の状態へ進める
 *
 * @param state 現在のゲームの状態
 * @param toriFuda 取札
 * @returns 次のゲームの状態
 */
export const takeCard: TakeCard = (
  { yomiFudas, toriFudas, pairCards, ...state }: GameState,
  toriFuda: ToriFudaInfo,
): GameState => {
  const correctId = yomiFudas[0].id;
  const result = toriFuda.id === correctId;

  const nextToriFudas = toriFudas.map((t) => {
    if (t.id === correctId) {
      return {
        ...t,
        status: result ? ToriFudaStatus.Corrected : ToriFudaStatus.Incorrected,
      };
    }
    return t;
  });
  const nextYomiFudas = yomiFudas.slice(1);
  const isGameOver = nextYomiFudas.length === 0;

  const scoreInfo = isGameOver
    ? calculateScore(nextToriFudas)
    : state.scoreInfo;
  const playResults = isGameOver
    ? convertPlayResults(pairCards, nextToriFudas)
    : [];

  return {
    pairCards,
    yomiFudas: nextYomiFudas,
    toriFudas: nextToriFudas,
    yomiFudaMessage: nextYomiFudas[0]?.text || "",
    isGameOver,
    scoreInfo,
    playResults,
  };
};
