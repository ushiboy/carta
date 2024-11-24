import { ToriFudaStatus } from "@/domains/models/carta";

import { calculateScore } from "./calculateScore";
import { toriFuda1, toriFuda2 } from "./testData";

describe("calculateStore", () => {
  it("取札の状態からスコアを算出する", () => {
    const r = calculateScore([
      {
        ...toriFuda1,
        status: ToriFudaStatus.Corrected,
      },
      { ...toriFuda2, status: ToriFudaStatus.Incorrected },
    ]);

    expect(r).toEqual({
      rate: 50,
      corrected: 1,
      incorrected: 1,
      total: 2,
    });
  });
});
