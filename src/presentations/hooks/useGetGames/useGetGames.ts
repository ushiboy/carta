import useSWR from "swr";

import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useGetGames() {
  const { gameRepository } = useRepository();

  const { data, isLoading } = useSWR(gameRepository.getAllGames.name, () => {
    return gameRepository.getAllGames();
  });

  return {
    games: data || [],
    isLoading,
  };
}
