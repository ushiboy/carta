import { useParams } from "react-router";

import { useGetGameDetail } from "@/presentations/hooks/useGetGameDetail";

export function usePlayGamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { game, isLoading } = useGetGameDetail(Number(gameId));

  return {
    game,
    isLoading,
  };
}
