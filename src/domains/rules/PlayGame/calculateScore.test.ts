import { GameState, ToriFudaStatus } from "@/domains/models/carta";

import { calculateScore } from "./calculateScore";
import {
  pairCard1,
  pairCard2,
  toriFuda1,
  toriFuda2,
  yomiFuda1,
  yomiFuda2,
} from "./testData";

describe("calculateStore", () => {
  const state: GameState = {
    pairCards: [pairCard1, pairCard2],
    yomiFudas: [yomiFuda1, yomiFuda2],
    toriFudas: [
      {
        ...toriFuda1,
        status: ToriFudaStatus.Corrected,
      },
      { ...toriFuda2, status: ToriFudaStatus.Incorrected },
    ],
    yomiFudaMessage: "",
    isGameOver: true,
  };

  it("取札の状態からスコアを算出する", () => {
    const r = calculateScore(state);
    expect(r).toEqual({
      rate: 50,
      corrected: 1,
      incorrected: 1,
      total: 2,
    });
  });
});
