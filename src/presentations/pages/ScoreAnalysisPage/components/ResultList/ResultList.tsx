import { Base, EmptyTableBody, Table, Th, Text, Loader } from "smarthr-ui";

import { PlayResult } from "@/domains/models/carta";

import { ResultListRow } from "./components/ResultListRow";

type Props = {
  results: PlayResult[];
  isLoading: boolean;
};

export function ResultList({ results, isLoading }: Props) {
  return (
    <Base overflow="auto">
      <Table>
        <thead>
          <tr>
            <Th>読み札</Th>
            <Th>取り札</Th>
            <Th className="w-16">正誤</Th>
          </tr>
        </thead>
        {results.length > 0 ? (
          <tbody>
            {results.map((r) => (
              <ResultListRow key={r.id} result={r} />
            ))}
          </tbody>
        ) : (
          <EmptyTableBody>
            {isLoading ? (
              <Loader data-testid="loading" size="s" alt="読み込み中" />
            ) : (
              <Text data-testid="empty" as="p">
                記録済みのプレイ結果がありません。
              </Text>
            )}
          </EmptyTableBody>
        )}
      </Table>
    </Base>
  );
}
