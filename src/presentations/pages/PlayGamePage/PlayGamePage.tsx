import { CartaEngine } from "@/domains/engines/CartaEngine/CartaEngine";
import { GameDetail } from "@/domains/models/carta";
import { Loading } from "@/presentations/shared/Loading";

import { GameStage } from "./components/GameStage";

type Props = {
  game?: GameDetail;
  isLoading: boolean;
};

export function PlayGamePage({ game, isLoading }: Props) {
  return (
    <div data-testid="playGamePage">
      <Loading show={isLoading} />
      {game && (
        <GameStage game={game} engine={new CartaEngine(game.pairCards)} />
      )}
    </div>
  );
}
