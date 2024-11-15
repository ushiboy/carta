import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CartaEngine } from "@/domains/engines/CartaEngine/CartaEngine";
import { ScoreInfo, ToriFudaInfo } from "@/domains/models/carta";

export function useGameStage(engine: CartaEngine) {
  const navigate = useNavigate();
  const [toriFudas, setToriFudas] = useState<ToriFudaInfo[]>([]);
  const [yomiFuda, setYomiFuda] = useState("");
  const [isGameOver, setGameOver] = useState(false);
  const [scoreInfo, setScoreInfo] = useState<ScoreInfo>({
    corrected: 0,
    incorrected: 0,
    total: 0,
    rate: 0,
  });

  useEffect(() => {
    engine.startGame();
    engine.onNextFuda(({ toriFudas, yomiFuda, isGameOver }) => {
      setToriFudas(toriFudas);
      setYomiFuda(yomiFuda);
      setGameOver(isGameOver);
      if (isGameOver) {
        setScoreInfo(engine.getScore());
      }
    });
    return () => {
      engine.dispose();
    };
  }, [engine]);

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
