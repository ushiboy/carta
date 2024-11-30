import { render } from "@testing-library/react";

import { ScoreLog } from "@/domains/models/carta";
import { Router } from "@/tests";

import { ScoreList } from "./ScoreList";

type Props = React.ComponentProps<typeof ScoreList>;

describe("ScoreList", () => {
  const score: ScoreLog = {
    id: 1,
    gameId: 10001,
    title: "Hello world.",
    corrected: 1,
    total: 2,
    createdAt: new Date("2024-01-01"),
  };

  const run = (props: Props) =>
    render(<ScoreList {...props} />, {
      wrapper: ({ children }) => <Router>{children}</Router>,
    });

  describe("isLoading", () => {
    describe("trueの場合", () => {
      it("ローディングが表示される", () => {
        const r = run({ scores: [], isLoading: true });
        expect(r.getByTestId("loading")).toBeInTheDocument();
      });
    });

    describe("falseの場合", () => {
      it("ローディングが表示されない", () => {
        const r = run({ scores: [], isLoading: false });
        expect(r.queryByTestId("loading")).toBeNull();
      });
    });
  });

  describe("scores", () => {
    describe("空の場合", () => {
      it("存在しない旨のメッセージが表示される", () => {
        const r = run({ scores: [], isLoading: false });
        expect(r.getByTestId("empty")).toHaveTextContent(
          "記録済みのスコアがありません。",
        );
      });
    });

    describe("空ではない場合", () => {
      it("件数分の行が表示される", () => {
        const scores = [score, { ...score, id: 2 }];
        const r = run({ scores, isLoading: false });
        expect(r.queryAllByTestId("scoreListRow")).toHaveLength(2);
      });
    });
  });
});
