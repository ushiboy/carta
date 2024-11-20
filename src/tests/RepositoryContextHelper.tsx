import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { MockGameRepository } from "@/infrastructures/repositories/GameRepository/MockGameRepository";
import { MockScoreRepository } from "@/infrastructures/repositories/ScoreRepository/MockScoreRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";
import { RepositoryContextProvider } from "@/presentations/contexts/RepositoryContext";

type Props = {
  gameRepository?: GameRepositoryInterface;
  scoreRepository?: ScoreRepositoryInterface;
  children: React.ReactNode;
};

export function RepositoryContextHelper({
  gameRepository,
  scoreRepository,
  children,
}: Props) {
  gameRepository = gameRepository || new MockGameRepository();
  scoreRepository = scoreRepository || new MockScoreRepository();
  return (
    <RepositoryContextProvider
      gameRepository={gameRepository}
      scoreRepository={scoreRepository}
    >
      {children}
    </RepositoryContextProvider>
  );
}
