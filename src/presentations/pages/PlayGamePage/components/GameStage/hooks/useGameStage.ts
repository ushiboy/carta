import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  GameDetail,
  GameState,
  ScoreInfo,
  ToriFudaInfo,
} from "@/domains/models/carta";
import {
  calculateScore,
  convertPlayResults,
  startGame,
  takeCard,
} from "@/domains/rules/PlayGame";
import { useAdapter } from "@/presentations/contexts/AdapterContext";
import { useSaveScore } from "@/presentations/hooks/useSaveScore";

export function useGameStage(game: GameDetail) {
  const navigate = useNavigate();
  const { textToSpeechAdapter } = useAdapter();
  const [state, setState] = useState<GameState>(startGame(game.pairCards));
  const { yomiFudaMessage, toriFudas, isGameOver } = state;

  const [scoreInfo, setScoreInfo] = useState<ScoreInfo>({
    corrected: 0,
    incorrected: 0,
    total: 0,
    rate: 0,
  });
  const { doSave } = useSaveScore();

  useEffect(() => {
    textToSpeechAdapter.speech(yomiFudaMessage);
    return () => {
      textToSpeechAdapter.cancel();
    };
  }, [textToSpeechAdapter, yomiFudaMessage]);

  const handleFudaClick = useCallback(
    (fuda: ToriFudaInfo) => {
      const nextState = takeCard(state, fuda);
      if (nextState.isGameOver) {
        const score = calculateScore(nextState);
        setScoreInfo(score);
        doSave({
          game,
          score,
          playResults: convertPlayResults(nextState),
        });
      }
      setState(nextState);
    },
    [state, game, doSave],
  );

  const handleRetry = useCallback(
    () => setState(startGame(game.pairCards)),
    [game],
  );

  const handleFinish = useCallback(() => navigate("/"), [navigate]);

  return {
    isGameOver,
    yomiFuda: yomiFudaMessage,
    toriFudas,
    scoreInfo,
    handleFudaClick,
    handleRetry,
    handleFinish,
  };
}
