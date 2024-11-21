import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CartaEngine } from "@/domains/engines/CartaEngine/CartaEngine";
import {
  GameDetail,
  ScoreInfo,
  ToriFudaInfo,
  ToriFudaStatus,
} from "@/domains/models/carta";
import { useAdapter } from "@/presentations/contexts/AdapterContext";
import { useSaveScore } from "@/presentations/hooks/useSaveScore";

export function useGameStage(engine: CartaEngine, game: GameDetail) {
  const navigate = useNavigate();
  const { textToSpeechAdapter } = useAdapter();
  const [toriFudas, setToriFudas] = useState<ToriFudaInfo[]>([]);
  const [yomiFuda, setYomiFuda] = useState("");
  const [isGameOver, setGameOver] = useState(false);
  const [scoreInfo, setScoreInfo] = useState<ScoreInfo>({
    corrected: 0,
    incorrected: 0,
    total: 0,
    rate: 0,
  });
  const { doSave } = useSaveScore();

  useEffect(() => {
    engine.startGame();
    engine.onNextFuda(({ toriFudas, yomiFuda, isGameOver }) => {
      textToSpeechAdapter.speech(yomiFuda);

      setToriFudas(toriFudas);
      setYomiFuda(yomiFuda);
      setGameOver(isGameOver);
      if (isGameOver) {
        const score = engine.getScore();
        setScoreInfo(score);
        /**
         * FIXME
         */
        doSave({
          game,
          score,
          playResults: game.pairCards.map(({ id, yomi, tori }) => ({
            id,
            yomi,
            tori,
            corrected:
              toriFudas.find((t) => t.id === id)?.status ===
              ToriFudaStatus.Corrected,
          })),
        });
      }
    });
    return () => {
      engine.dispose();
      textToSpeechAdapter.cancel();
    };
  }, [engine, game, textToSpeechAdapter, doSave]);

  const handleFudaClick = useCallback(
    (fuda: ToriFudaInfo) => engine.tori(fuda),
    [engine],
  );

  const handleRetry = useCallback(() => {
    engine.startGame();
  }, [engine]);

  const handleFinish = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    isGameOver,
    yomiFuda,
    toriFudas,
    scoreInfo,
    handleFudaClick,
    handleRetry,
    handleFinish,
  };
}
