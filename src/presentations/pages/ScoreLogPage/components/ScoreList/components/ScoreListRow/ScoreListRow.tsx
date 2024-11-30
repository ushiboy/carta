import { Link } from "react-router-dom";
import { Td } from "smarthr-ui";

import { ScoreLog } from "@/domains/models/carta";
import { formatDateTime } from "@/lib/formatDateTime";

type Props = {
  score: ScoreLog;
};

export function ScoreListRow({ score }: Props) {
  return (
    <tr data-testid="scoreListRow">
      <Td data-testid="title">
        <Link to={`/scores/${score.id}`}>{score.title}</Link>
      </Td>
      <Td data-testid="score">
        {score.corrected} / {score.total}
      </Td>
      <Td data-testid="date">{formatDateTime(score.createdAt)}</Td>
    </tr>
  );
}
