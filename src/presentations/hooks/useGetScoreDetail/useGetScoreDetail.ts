import useSWR from "swr";

import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useGetScoreDetail(logId: number) {
  const { scoreRepository } = useRepository();

  const { data, isLoading } = useSWR(
    scoreRepository.getScoreDetail.name,
    () => {
      return scoreRepository.getScoreDetail(logId);
    },
  );

  return {
    score: data?.score,
    playResults: data?.playResults || [],
    isLoading,
  };
}
