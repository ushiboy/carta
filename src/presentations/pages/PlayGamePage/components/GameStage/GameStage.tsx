import { GameDetail } from "@/domains/models/carta";

import { GameOverDialog } from "./components/GameOverDialog";
import { ToriFuda } from "./components/ToriFuda";
import { useGameStage } from "./hooks";

type Props = {
  game: GameDetail;
};

export function GameStage({ game }: Props) {
  const {
    isGameOver,
    toriFudas,
    yomiFuda,
    scoreInfo,
    handleFudaClick,
    handleFinish,
    handleRetry,
  } = useGameStage(game);
  return (
    <div data-testid="gameStage">
      <h1 data-testid="title">{game.title}</h1>
      <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4">
        <div className="flex-grow text-gray-700" data-testid="yomiFuda">
          {yomiFuda}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {toriFudas.map((fuda) => (
          <ToriFuda key={fuda.id} info={fuda} onClick={handleFudaClick} />
        ))}
      </div>
      <GameOverDialog
        open={isGameOver}
        scoreInfo={scoreInfo}
        onRetry={handleRetry}
        onFinish={handleFinish}
      />
    </div>
  );
}
