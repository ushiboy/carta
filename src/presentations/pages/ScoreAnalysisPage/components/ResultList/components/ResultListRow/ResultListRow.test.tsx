import { render } from "@testing-library/react";

import { PlayResult } from "@/domains/models/carta";
import { Router } from "@/tests";

import { ResultListRow } from "./ResultListRow";

describe("ResultListRow", () => {
  const result: PlayResult = {
    id: 1,
    yomi: "yomi1",
    tori: "tori1",
    corrected: true,
  };

  const run = (result: PlayResult) =>
    render(<ResultListRow result={result} />, {
      wrapper: ({ children }) => (
        <Router>
          <table>
            <tbody>{children}</tbody>
          </table>
        </Router>
      ),
    });

  it("yomiが表示される", () => {
    const r = run(result);
    expect(r.getByTestId("yomi")).toHaveTextContent(result.yomi);
  });

  it("toriが表示される", () => {
    const r = run(result);
    expect(r.getByTestId("tori")).toHaveTextContent(result.tori);
  });

  describe("corrected", () => {
    describe("trueの場合", () => {
      it("正解アイコンが表示される", () => {
        const r = run({
          ...result,
          corrected: true,
        });
        expect(r.getByTestId("corrected")).toBeInTheDocument();
        expect(r.queryByTestId("incorrected")).toBeNull();
      });
    });

    describe("falseの場合", () => {
      it("不正解アイコンが表示される", () => {
        const r = run({
          ...result,
          corrected: false,
        });
        expect(r.getByTestId("incorrected")).toBeInTheDocument();
        expect(r.queryByTestId("corrected")).toBeNull();
      });
    });
  });
});
