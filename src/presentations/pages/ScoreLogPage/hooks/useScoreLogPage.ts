import { useGetScores } from "@/presentations/hooks/useGetScores";

export function useScoreLogPage() {
  const { scores, isLoading } = useGetScores();

  return {
    scores,
    isLoading,
  };
}
