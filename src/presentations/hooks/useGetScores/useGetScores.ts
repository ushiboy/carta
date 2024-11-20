import useSWR from "swr";

import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useGetScores() {
  const { scoreRepository } = useRepository();

  const { data, isLoading } = useSWR(
    scoreRepository.getLatestScores.name,
    () => {
      return scoreRepository.getLatestScores(20);
    },
  );

  return {
    scores: data || [],
    isLoading,
  };
}
