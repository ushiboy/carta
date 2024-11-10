import { useGetGames } from "@/presentations/hooks/useGetGames";

export function useHomePage() {
  const { games, isLoading } = useGetGames();

  return {
    games,
    isLoading,
  };
}
