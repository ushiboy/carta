import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";

import { context } from "./context";

export const RepositoryContextProvider: React.FC<{
  gameRepository: GameRepositoryInterface;
  scoreRepository: ScoreRepositoryInterface;
  children: React.ReactNode;
}> = ({ gameRepository, scoreRepository, children }) => {
  return (
    <context.Provider
      value={{
        gameRepository,
        scoreRepository,
      }}
    >
      {children}
    </context.Provider>
  );
};
