import { useGetGames } from "@/presentations/hooks/useGetGames";

export function useAnalysisGamePage() {
  const { games, isLoading } = useGetGames();

  return {
    games,
    isLoading,
  };
}
