import { parseCsvFile } from "./parseCsvFile";

describe("parseCsvFile", () => {
  it("CSVファイルをパースして返す", async () => {
    expect(await parseCsvFile(new File(["a,b"], "test.csv"))).toEqual([
      ["a", "b"],
    ]);
  });
});
