import { PlayResult, ScoreLog } from "@/domains/models/carta";
import { formatDateTime } from "@/lib/formatDateTime";
import { Loading } from "@/presentations/shared/Loading";

type Props = {
  score?: ScoreLog;
  playResults: PlayResult[];
  isLoading: boolean;
};

export function ScoreAnalysisPage({ score, playResults, isLoading }: Props) {
  return (
    <div data-testid="scoreAnalysisPage">
      <Loading show={isLoading} />
      {score && (
        <div className="mb-3">
          <h1>
            {score.title} - {formatDateTime(score.createdAt)}
          </h1>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                読み札
              </th>
              <th scope="col" className="px-6 py-3">
                取り札
              </th>
              <th scope="col" className="px-6 py-3">
                正誤
              </th>
            </tr>
          </thead>
          <tbody>
            {playResults.map((r) => (
              <tr
                key={r.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{r.yomi}</td>
                <td className="px-6 py-4">{r.tori}</td>
                <td className="px-6 py-4">{r.corrected ? "o" : "x"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
