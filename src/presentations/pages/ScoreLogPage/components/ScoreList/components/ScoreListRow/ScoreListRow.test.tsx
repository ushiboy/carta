import { render } from "@testing-library/react";

import { ScoreLog } from "@/domains/models/carta";
import { formatDateTime } from "@/lib/formatDateTime";
import { Router } from "@/tests";

import { ScoreListRow } from "./ScoreListRow";

describe("ScoreListRow", () => {
  const score: ScoreLog = {
    id: 1,
    gameId: 10001,
    title: "Hello world.",
    corrected: 1,
    total: 2,
    createdAt: new Date("2024-01-01"),
  };

  const run = (score: ScoreLog) =>
    render(<ScoreListRow score={score} />, {
      wrapper: ({ children }) => (
        <Router>
          <table>
            <tbody>{children}</tbody>
          </table>
        </Router>
      ),
    });

  it("titleが表示される", () => {
    const r = run(score);
    expect(r.getByTestId("title")).toHaveTextContent(score.title);
  });

  it(`スコアが"corrected / total"で表示される`, () => {
    const r = run(score);
    expect(r.getByTestId("score")).toHaveTextContent(
      `${score.corrected} / ${score.total}`,
    );
  });

  it(`createdAtが"yyyy/MM/dd hh:mm"書式で表示される`, () => {
    const r = run(score);
    expect(r.getByTestId("date")).toHaveTextContent(
      formatDateTime(score.createdAt),
    );
  });
});
