import {
  GameState,
  PairCard,
  ToriFudaInfo,
  ToriFudaStatus,
  YomiFudaInfo,
} from "@/domains/models/carta";
import { randomShuffleFudas, ShuffleRule } from "@/domains/rules/ShuffleRule";

import { StartGame } from "./interface";

/**
 * ゲームを開始して初期状態を返す
 *
 * @param pairCards 読み札と取札のペアリスト
 * @param shuffleRule シャッフルルール
 * @returns ゲームの初期状態
 */
export const startGame: StartGame = (
  pairCards: PairCard[],
  shuffleRule?: ShuffleRule,
): GameState => {
  shuffleRule = shuffleRule || randomShuffleFudas;
  const t = convertPairCards(pairCards);
  const yomiFudas = shuffleRule(t.yomiFudas);
  const toriFudas = shuffleRule(t.toriFudas);
  return {
    pairCards,
    yomiFudas,
    toriFudas,
    yomiFudaMessage: yomiFudas[0].text,
    isGameOver: yomiFudas.length === 0,
    scoreInfo: {
      corrected: 0,
      incorrected: 0,
      total: yomiFudas.length,
      rate: 0,
    },
    playResults: [],
  };
};

function convertPairCards(pairCards: PairCard[]): {
  yomiFudas: YomiFudaInfo[];
  toriFudas: ToriFudaInfo[];
} {
  const toriFudas: ToriFudaInfo[] = [];
  const yomiFudas: YomiFudaInfo[] = [];
  pairCards.forEach(({ id, tori, yomi }) => {
    toriFudas.push({
      id,
      text: tori,
      status: ToriFudaStatus.Default,
    });
    yomiFudas.push({
      id,
      text: yomi,
    });
  });
  return {
    yomiFudas,
    toriFudas,
  };
}
