import { ToriFudaStatus } from "@/domains/models/carta";

import { convertPlayResults } from "./convertPlayResults";
import { pairCard1, pairCard2, toriFuda1, toriFuda2 } from "./testData";

describe("convertPlayResults", () => {
  it("取札の状態から結果を返す", () => {
    const r = convertPlayResults(
      [pairCard1, pairCard2],
      [
        {
          ...toriFuda1,
          status: ToriFudaStatus.Corrected,
        },
        { ...toriFuda2, status: ToriFudaStatus.Incorrected },
      ],
    );

    expect(r).toEqual([
      {
        ...pairCard1,
        corrected: true,
      },
      {
        ...pairCard2,
        corrected: false,
      },
    ]);
  });
});
