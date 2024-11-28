import { useMemo } from "react";
import { useParams } from "react-router";

import { useGetGameDetail } from "@/presentations/hooks/useGetGameDetail";
import { useGetScoreDetails } from "@/presentations/hooks/useGetScoreDetails";

export function useAnalysisGamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const gameDetail = useGetGameDetail(Number(gameId));
  const scoreDetails = useGetScoreDetails(Number(gameId));

  const words = useMemo(() => {
    const tmp = new Map<string, number>();
    scoreDetails.details.forEach(({ playResults }) => {
      playResults.forEach(({ tori, corrected }) => {
        const v = tmp.get(tori) || 0;
        if (corrected) {
          tmp.set(tori, v + 10);
        } else {
          tmp.set(tori, v + 2);
        }
      });
    });

    return Array.from(tmp.entries()).map(([text, value]) => ({
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
