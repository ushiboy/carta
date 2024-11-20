import { ScoreLog } from "@/domains/models/carta";
import { formatDateTime } from "@/lib/formatDateTime";
import { Loading } from "@/presentations/shared/Loading";

type Props = {
  scores: ScoreLog[];
  isLoading: boolean;
};

export function ScoreLogPage({ scores, isLoading }: Props) {
  return (
    <div data-testid="scoreLogPage">
      <Loading show={isLoading} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                タイトル
              </th>
              <th scope="col" className="px-6 py-3">
                スコア
              </th>
              <th scope="col" className="px-6 py-3">
                日時
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr
                key={s.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{s.title}</td>
                <td className="px-6 py-4">
                  {s.corrected} / {s.total}
                </td>
                <td className="px-6 py-4">{formatDateTime(s.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
