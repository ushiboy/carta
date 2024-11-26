import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { GameDetail, GameState, ToriFudaInfo } from "@/domains/models/carta";
import { startGame, takeCard } from "@/domains/rules/PlayGame";
import { useAdapter } from "@/presentations/contexts/AdapterContext";
import { useSaveScore } from "@/presentations/hooks/useSaveScore";

export function useGameStage(game: GameDetail) {
  const navigate = useNavigate();
  const { textToSpeechAdapter } = useAdapter();
  const [state, setState] = useState<GameState>(startGame(game.pairCards));
  const { yomiFudaMessage, toriFudas, isGameOver, scoreInfo } = state;
  const [openStartDialog, setOpenStartDialog] = useState(true);

  const { doSave } = useSaveScore();

  useEffect(() => {
    return () => {
      textToSpeechAdapter.cancel();
    };
  }, [textToSpeechAdapter]);

  const handleFudaClick = useCallback(
    (fuda: ToriFudaInfo) => {
      const nextState = takeCard(state, fuda);
      if (nextState.isGameOver) {
        doSave({
          game,
          score: nextState.scoreInfo,
          playResults: nextState.playResults,
        });
      } else {
        textToSpeechAdapter.speech(nextState.yomiFudaMessage);
      }
      setState(nextState);
    },
    [state, textToSpeechAdapter, game, doSave],
  );

  const handleRetry = useCallback(() => {
    const newState = startGame(game.pairCards);
    textToSpeechAdapter.speech(newState.yomiFudaMessage);
    setState(newState);
  }, [game, textToSpeechAdapter]);

  const handleFinish = useCallback(() => navigate("/"), [navigate]);

  const handleStart = useCallback(() => {
    setOpenStartDialog(false);
    textToSpeechAdapter.speech(yomiFudaMessage);
  }, [textToSpeechAdapter, yomiFudaMessage]);

  return {
    isGameOver,
    yomiFuda: yomiFudaMessage,
    toriFudas,
    scoreInfo,
    openStartDialog,
    handleStart,
    handleFudaClick,
    handleRetry,
    handleFinish,
  };
}
