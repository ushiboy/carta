import { render } from "@testing-library/react";

import { Router } from "@/tests";

import { AppRoutes } from "./AppRoutes";

describe("AppRoutes", () => {
  const run = (path: string) =>
    render(<AppRoutes />, {
      wrapper: ({ children }) => <Router initPath={path}>{children}</Router>,
    });

  describe(`パスが"/"の場合`, () => {
    it("Homeページが表示される", () => {
      expect(run("/").getByTestId("homePage")).toBeInTheDocument();
    });
  });

  describe(`定義外のパスの場合`, () => {
    it("NotFoundページが表示される", () => {
      expect(run("/unknown").getByTestId("notFoundPage")).toBeInTheDocument();
    });
  });
});
