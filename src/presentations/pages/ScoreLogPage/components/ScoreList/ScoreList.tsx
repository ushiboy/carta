import { Base, EmptyTableBody, Table, Th, Text, Loader } from "smarthr-ui";

import { ScoreLog } from "@/domains/models/carta";

import { ScoreListRow } from "./components/ScoreListRow";

type Props = {
  scores: ScoreLog[];
  isLoading: boolean;
};

export function ScoreList({ scores, isLoading }: Props) {
  return (
    <Base overflow="auto">
      <Table>
        <thead>
          <tr>
            <Th>タイトル</Th>
            <Th className="w-20 md:w-48">スコア</Th>
            <Th className="md:w-48">日時</Th>
          </tr>
        </thead>
        {scores.length > 0 ? (
          <tbody>
            {scores.map((s) => (
              <ScoreListRow key={s.id} score={s} />
            ))}
          </tbody>
        ) : (
          <EmptyTableBody>
            {isLoading ? (
              <Loader data-testid="loading" size="s" alt="読み込み中" />
            ) : (
              <Text data-testid="empty" as="p">
                記録済みのスコアがありません。
              </Text>
            )}
          </EmptyTableBody>
        )}
      </Table>
    </Base>
  );
}
