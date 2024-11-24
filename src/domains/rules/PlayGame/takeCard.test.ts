import { GameState, ToriFudaStatus } from "@/domains/models/carta";

import { takeCard } from "./takeCard";
import {
  pairCard1,
  pairCard2,
  toriFuda1,
  toriFuda2,
  yomiFuda1,
  yomiFuda2,
} from "./testData";

describe("takeCard", () => {
  const state: GameState = {
    pairCards: [pairCard1, pairCard2],
    yomiFudas: [yomiFuda1, yomiFuda2],
    toriFudas: [toriFuda1, toriFuda2],
    yomiFudaMessage: yomiFuda1.text,
    isGameOver: false,
  };

  describe("正答の場合", () => {
    it("取札のステータスを正解にする", () => {
      const r = takeCard(state, toriFuda1);
      expect(r.toriFudas[0]).toEqual({
        ...toriFuda1,
        status: ToriFudaStatus.Corrected,
      });
      expect(r.toriFudas[1]).toEqual(toriFuda2);
    });
  });

  describe("誤答の場合", () => {
    it("取札のステータスを不正解にする", () => {
      const r = takeCard(state, toriFuda2);
      expect(r.toriFudas[0]).toEqual({
        ...toriFuda1,
        status: ToriFudaStatus.Incorrected,
      });
      expect(r.toriFudas[1]).toEqual(toriFuda2);
    });
  });

  describe("読み札がまだ残っている場合", () => {
    it("読み札を次の札にする", () => {
      const r = takeCard(state, toriFuda1);
      expect(r.yomiFudaMessage).toBe(yomiFuda2.text);
    });

    it("ゲームは続行とする", () => {
      const r = takeCard(state, toriFuda1);
      expect(r.isGameOver).toBe(false);
    });
  });

  describe("読み札が残っていない場合", () => {
    it("読み札を空文字にする", () => {
      const r = takeCard(takeCard(state, toriFuda1), toriFuda2);
      expect(r.yomiFudaMessage).toBe("");
    });

    it("ゲームは終了とする", () => {
      const r = takeCard(takeCard(state, toriFuda1), toriFuda2);
      expect(r.isGameOver).toBe(true);
    });
  });
});
