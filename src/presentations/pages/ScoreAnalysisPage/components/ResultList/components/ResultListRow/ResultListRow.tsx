import { FaCircleCheckIcon, FaCircleXmarkIcon, Td } from "smarthr-ui";
import { tv } from "tailwind-variants";

import { PlayResult } from "@/domains/models/carta";

type Props = {
  result: PlayResult;
};

const row = tv({
  base: "",
  variants: {
    corrected: {
      true: "",
      false: "bg-red-100",
    },
  },
});

export function ResultListRow({ result }: Props) {
  return (
    <tr data-testid="resultListRow" className={row(result)}>
      <Td data-testid="yomi">{result.yomi}</Td>
      <Td data-testid="tori">{result.tori}</Td>
      <Td data-testid="result">
        {result.corrected ? (
          <FaCircleCheckIcon
            data-testid="corrected"
            className="text-green-600"
          />
        ) : (
          <FaCircleXmarkIcon
            data-testid="incorrected"
            className="text-red-700"
          />
        )}
      </Td>
    </tr>
  );
}
