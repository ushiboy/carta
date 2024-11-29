import { Link } from "react-router-dom";

import { Game } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

type Props = {
  games: Game[];
  isLoading: boolean;
};

export function AnalysisGamesPage({ games, isLoading }: Props) {
  return (
    <div data-testid="analysisGamesPage">
      <Loading show={isLoading} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                タイトル
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((s) => (
              <tr
                key={s.id}
                data-testid="scoreListRow"
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  <Link to={`/analysis/${s.id}`}>{s.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
