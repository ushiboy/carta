import { SpeakerXMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Button } from "smarthr-ui";

import { GameDetail } from "@/domains/models/carta";

import { GameOverDialog } from "./components/GameOverDialog";
import { GameStartDialog } from "./components/GameStartDialog";
import { ToriFuda } from "./components/ToriFuda";
import { useGameStage } from "./hooks";

type Props = {
  game: GameDetail;
};

export function GameStage({ game }: Props) {
  const {
    isGameOver,
    isMuted,
    toriFudas,
    yomiFuda,
    scoreInfo,
    openStartDialog,
    handleStart,
    handleFudaClick,
    handleFinish,
    handleRetry,
    handleClickVolume,
  } = useGameStage(game);
  return (
    <div data-testid="gameStage" className="mb:p-4 p-2">
      <h1 data-testid="title" className="mb-3 text-xl">
        {game.title}
      </h1>
      <div className="mb:static mb:top-0 sticky top-2 mb-4 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4">
        <div className="flex-grow text-gray-700" data-testid="yomiFuda">
          {yomiFuda}
        </div>
        <Button size="s" onClick={handleClickVolume}>
          {isMuted ? (
            <SpeakerXMarkIcon className="size-6" />
          ) : (
            <SpeakerWaveIcon className="size-6" />
          )}
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {toriFudas.map((fuda) => (
          <ToriFuda key={fuda.id} info={fuda} onClick={handleFudaClick} />
        ))}
      </div>
      <GameStartDialog
        open={openStartDialog}
        game={game}
        onStart={handleStart}
      />
      <GameOverDialog
        open={isGameOver}
        scoreInfo={scoreInfo}
        onRetry={handleRetry}
        onFinish={handleFinish}
      />
    </div>
  );
}
