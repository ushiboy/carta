import { useMemo } from "react";
import { useParams } from "react-router";

import { useGetGameDetail } from "@/presentations/hooks/useGetGameDetail";
import { useGetScoreDetails } from "@/presentations/hooks/useGetScoreDetails";

export function useAnalysisGamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const gameDetail = useGetGameDetail(Number(gameId));
  const scoreDetails = useGetScoreDetails(Number(gameId));

  const words = useMemo(() => {
    const correctedWords = new Map<string, number>();
    scoreDetails.details.forEach(({ playResults }) => {
      playResults.forEach(({ tori, corrected }) => {
        if (corrected) {
          const v = correctedWords.get(tori) || 0;
          correctedWords.set(tori, v + 1);
        }
      });
    });

    return Array.from(correctedWords.entries()).map(([text, value]) => ({
      text,
      value,
    }));
  }, [scoreDetails.details]);

  return {
    game: gameDetail.game,
    words,
    isLoading: gameDetail.isLoading || scoreDetails.isLoading,
  };
}
