import { useParams } from "react-router";

import { useGetScoreDetail } from "@/presentations/hooks/useGetScoreDetail";

export function useScoreAnalysisPage() {
  const { logId } = useParams<{ logId: string }>();
  const { score, playResults, isLoading } = useGetScoreDetail(Number(logId));

  return {
    score,
    playResults: playResults,
    isLoading,
  };
}
