import useSWR from "swr";

import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useGetGameDetail(gameId: number) {
  const { gameRepository } = useRepository();

  const { data, isLoading } = useSWR(gameRepository.getGameDetail.name, () => {
    return gameRepository.getGameDetail(gameId);
  });

  return {
    game: data,
    isLoading,
  };
}
