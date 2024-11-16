import { Link } from "react-router-dom";

import { Game } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

type Props = {
  games: Game[];
  isLoading: boolean;
};

export function HomePage({ games, isLoading }: Props) {
  return (
    <div data-testid="homePage">
      <Loading show={isLoading} />
      <ul>
        {games.map((g) => (
          <li key={g.id}>
            <Link to={`/games/${g.id}`}>{g.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
