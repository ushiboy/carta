import { ShuffleRule } from "@/domains/rules/ShuffleRule";

import { startGame } from "./startGame";
import {
  pairCard1,
  pairCard2,
  toriFuda1,
  toriFuda2,
  yomiFuda1,
  yomiFuda2,
} from "./testData";

/**
 * 初期の札の並び順を維持するシャッフルルール
 */
const fixedOrderFudas: ShuffleRule = (fudas) => [...fudas];

describe("startGame", () => {
  it("ゲームを初期状態にする", () => {
    const r = startGame([pairCard1, pairCard2]);
    expect(r.pairCards).toEqual([pairCard1, pairCard2]);
    expect(r.yomiFudas).toHaveLength(2);
    expect(r.toriFudas).toHaveLength(2);
    expect(r.yomiFudaMessage).toBe(r.yomiFudas[0].text);
    expect(r.isGameOver).toBe(false);
  });

  it("シャッフルルールに従って読み札と取札をシャッフルする", () => {
    const r = startGame([pairCard1, pairCard2], fixedOrderFudas);
    expect(r.yomiFudas).toEqual([yomiFuda1, yomiFuda2]);
    expect(r.toriFudas).toEqual([toriFuda1, toriFuda2]);
  });
});
