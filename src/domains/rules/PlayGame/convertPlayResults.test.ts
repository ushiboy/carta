import { GameState, ToriFudaStatus } from "@/domains/models/carta";

import { convertPlayResults } from "./convertPlayResults";
import {
  pairCard1,
  pairCard2,
  toriFuda1,
  toriFuda2,
  yomiFuda1,
  yomiFuda2,
} from "./testData";

describe("convertPlayResults", () => {
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

  it("取札の状態から結果を返す", () => {
    const r = convertPlayResults(state);
    expect(r).toEqual([
      {
        ...pairCard1,
        corrected: true,
      },
      {
        ...pairCard2,
        corrected: false,
      },
    ]);
  });
});
