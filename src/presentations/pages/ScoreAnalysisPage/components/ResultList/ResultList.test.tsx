import { render } from "@testing-library/react";

import { PlayResult } from "@/domains/models/carta";
import { Router } from "@/tests";

import { ResultList } from "./ResultList";

type Props = React.ComponentProps<typeof ResultList>;

describe("ResultList", () => {
  const result: PlayResult = {
    id: 1,
    yomi: "yomi1",
    tori: "tori1",
    corrected: true,
  };

  const run = (props: Props) =>
    render(<ResultList {...props} />, {
      wrapper: ({ children }) => <Router>{children}</Router>,
    });

  describe("isLoading", () => {
    describe("trueの場合", () => {
      it("ローディングが表示される", () => {
        const r = run({ results: [], isLoading: true });
        expect(r.getByTestId("loading")).toBeInTheDocument();
      });
    });

    describe("falseの場合", () => {
      it("ローディングが表示されない", () => {
        const r = run({ results: [], isLoading: false });
        expect(r.queryByTestId("loading")).toBeNull();
      });
    });
  });

  describe("results", () => {
    describe("空の場合", () => {
      it("存在しない旨のメッセージが表示される", () => {
        const r = run({ results: [], isLoading: false });
        expect(r.getByTestId("empty")).toHaveTextContent(
          "記録済みのプレイ結果がありません。",
        );
      });
    });

    describe("空ではない場合", () => {
      it("件数分の行が表示される", () => {
        const results = [result, { ...result, id: 2 }];
        const r = run({ results, isLoading: false });
        expect(r.queryAllByTestId("resultListRow")).toHaveLength(2);
      });
    });
  });
});
