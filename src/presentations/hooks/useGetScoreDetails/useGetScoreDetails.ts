import useSWR from "swr";

import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useGetScoreDetails(gameId: number) {
  const { scoreRepository } = useRepository();

  const { data, isLoading } = useSWR(
    [scoreRepository.getScoreDetails.name, gameId],
    () => {
      return scoreRepository.getScoreDetails(gameId);
    },
  );

  return {
    details: data || [],
    isLoading,
  };
}
