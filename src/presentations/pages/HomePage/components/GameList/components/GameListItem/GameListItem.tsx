import { Link } from "react-router-dom";

import image from "@/assets/images/japanese-paper.webp";
import { Game } from "@/domains/models/carta";

type Props = {
  game: Game;
};

/**
 * かるたゲームリストアイテム
 */
export function GameListItem({ game }: Props) {
  return (
    <li data-testid="gameListItem" className="list-none">
      <Link to={`/games/${game.id}`} title={game.title}>
        <div
          className="mb-4 h-16 w-full rounded-sm p-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-400 md:h-32 md:w-64 md:p-4"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex h-full w-full items-center justify-center bg-white/70 p-1">
            <p className="truncate">{game.title}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
