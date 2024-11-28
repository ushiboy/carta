import { format } from "date-fns";
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

  const chart = useMemo(() => {
    const labels: string[] = [];
    const corrected: number[] = [];
    const incorrected: number[] = [];

    scoreDetails.details.forEach(({ score }) => {
      labels.push(format(score.createdAt, "yyyy/MM/dd"));
      corrected.push(score.corrected);
      incorrected.push(score.total - score.corrected);
    });

    return {
      labels,
      corrected,
      incorrected,
    };
  }, [scoreDetails.details]);

  const wordsChart = useMemo(() => {
    const labels: string[] = [];
    const corrected: number[] = [];
    const incorrected: number[] = [];

    const tmp = new Map<string, number>();
    scoreDetails.details.forEach(({ playResults }) => {
      playResults.forEach(({ tori, corrected }) => {
        const v = tmp.get(tori) || 0;
        if (corrected) {
          tmp.set(tori, v + 1);
        } else {
          tmp.set(tori, v);
        }
      });
    });

    const total = scoreDetails.details.length;
    Array.from(tmp.entries()).forEach(([text, value]) => {
      labels.push(text);
      const rate = Math.floor((value / total) * 100);
      corrected.push(rate);
      incorrected.push(100 - rate);
    });

    return {
      labels,
      corrected,
      incorrected,
    };
  }, [scoreDetails.details]);

  console.log({ wordsChart });

  return {
    game: gameDetail.game,
    words,
    chart,
    wordsChart,
    isLoading: gameDetail.isLoading || scoreDetails.isLoading,
  };
}
