import { render, waitFor } from "@testing-library/react";

import { CartaEngine } from "@/domains/engines/CartaEngine/CartaEngine";
import { GameDetail, PairCard } from "@/domains/models/carta";
import { Router } from "@/tests";

import { GameStage } from "./GameStage";

describe("GameStage", () => {
  // 札ペア1
  const pairCard1: PairCard = {
    id: 1,
    yomi: "hello",
    tori: "world",
  };

  const detail: GameDetail = {
    id: 1,
    title: "test",
    pairCards: [pairCard1],
  };

  const engine = new CartaEngine([pairCard1]);

  const run = () =>
    render(<GameStage game={detail} engine={engine} />, {
      wrapper: ({ children }) => <Router initPath="">{children}</Router>,
    });

  it("titleが表示される", () => {
    const r = run();
    expect(r.getByTestId("title")).toHaveTextContent(detail.title);
  });

  it("読み札が表示される", async () => {
    const r = run();
    await waitFor(() =>
      expect(r.getByTestId("yomiFuda")).toHaveTextContent(pairCard1.yomi),
    );
  });

  it("取り札が表示される", async () => {
    const r = run();
    await waitFor(() => expect(r.getByTestId("toriFuda")).toBeInTheDocument());
  });
});
