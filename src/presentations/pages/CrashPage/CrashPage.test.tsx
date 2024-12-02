import { render } from "@testing-library/react";

import { CrashPage } from "./";

describe("CrashPage", () => {
  const run = (error: Error) => render(<CrashPage error={error} />);

  it("エラーのmessageが表示される", () => {
    const r = run(new Error("error!"));
    expect(r.getByTestId("message")).toHaveTextContent("error!");
  });
});
