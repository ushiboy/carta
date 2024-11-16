import { PairCard, ToriFudaInfo, ToriFudaStatus } from "@/domains/models/carta";
import { ShuffleRule } from "@/domains/rules/ShuffleRule";

import { CartaEngine } from "./CartaEngine";

describe("CartaEngine", () => {
  // 札ペア1
  const pairCard1: PairCard = {
    id: 1,
    yomi: "hello",
    tori: "world",
  };

  // 札ペア2
  const pairCard2: PairCard = {
    id: 2,
    yomi: "fizz",
    tori: "buzz",
  };

  // 取札1
  const toriFuda1: ToriFudaInfo = {
    id: pairCard1.id,
    text: pairCard1.tori,
    status: ToriFudaStatus.Default,
  };

  // 取札2
  const toriFuda2: ToriFudaInfo = {
    id: pairCard2.id,
    text: pairCard2.tori,
    status: ToriFudaStatus.Default,
  };

  /**
   * 初期の札の並び順を維持するシャッフルルール
   */
  const fixedOrderFudas: ShuffleRule = (fudas) => [...fudas];

  describe("ゲームの進行を管理する", () => {
    describe("すべてのカードに正答してクリアする場合", () => {
      it(`正答したカードのステータスが${ToriFudaStatus.Corrected}になり、ゲーム終了する`, () => {
        const engine = new CartaEngine([pairCard1]).startGame();
        expect(engine.getAllToriFudas()).toEqual([toriFuda1]);
        expect(engine.isGameOver()).toBe(false);

        expect(engine.yomi()).toBe(pairCard1.yomi);
        expect(engine.tori(toriFuda1)).toBe(true);

        expect(engine.getAllToriFudas()).toEqual([
          {
            ...toriFuda1,
            status: ToriFudaStatus.Corrected,
          },
        ]);
        expect(engine.isGameOver()).toBe(true);
      });
    });

    describe("一部のカードに正答してクリアする場合", () => {
      it(`間違えたカードのステータスが${ToriFudaStatus.Incorrected}になる`, () => {
        const engine = new CartaEngine(
          [pairCard1, pairCard2],
          fixedOrderFudas,
        ).startGame();
        expect(engine.getAllToriFudas()).toEqual([toriFuda1, toriFuda2]);
        expect(engine.isGameOver()).toBe(false);

        expect(engine.yomi()).toBe(pairCard1.yomi);
        expect(engine.tori(toriFuda2)).toBe(false);
        expect(engine.getAllToriFudas()).toEqual([
          {
            ...toriFuda1,
            status: ToriFudaStatus.Incorrected,
          },
          toriFuda2,
        ]);
        expect(engine.isGameOver()).toBe(false);

        expect(engine.yomi()).toBe(pairCard2.yomi);
        expect(engine.tori(toriFuda2)).toBe(true);
        expect(engine.getAllToriFudas()).toEqual([
          {
            ...toriFuda1,
            status: ToriFudaStatus.Incorrected,
          },
          {
            ...toriFuda2,
            status: ToriFudaStatus.Corrected,
          },
        ]);
        expect(engine.isGameOver()).toBe(true);
      });
    });

    it("進行をイベントで監視できる", async () => {
      const engine = new CartaEngine([pairCard1]).startGame();
      const listener = vi.fn();
      engine.onNextFuda(listener);

      await vi.waitFor(() =>
        expect(listener).toHaveBeenCalledWith({
          toriFudas: [toriFuda1],
          yomiFuda: pairCard1.yomi,
          isGameOver: false,
        }),
      );
      engine.tori(toriFuda1);

      await vi.waitFor(() =>
        expect(listener).toHaveBeenCalledWith({
          toriFudas: [{ ...toriFuda1, status: ToriFudaStatus.Corrected }],
          yomiFuda: "",
          isGameOver: true,
        }),
      );
    });
  });

  describe("dispose", () => {
    it("ゲーム進行イベントの監視を解除できる", async () => {
      const engine = new CartaEngine([pairCard1]).startGame();
      const listener = vi.fn();
      engine.onNextFuda(listener);

      await vi.waitFor(() =>
        expect(listener).toHaveBeenCalledWith({
          toriFudas: [toriFuda1],
          yomiFuda: pairCard1.yomi,
          isGameOver: false,
        }),
      );

      engine.dispose();
      engine.tori(toriFuda1);

      await vi.waitFor(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1);
        });
      });

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
