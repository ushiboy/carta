import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";

import { context } from "./context";

export const RepositoryContextProvider: React.FC<{
  gameRepository: GameRepositoryInterface;
  children: React.ReactNode;
}> = ({ gameRepository, children }) => {
  return (
    <context.Provider
      value={{
        gameRepository,
      }}
    >
      {children}
    </context.Provider>
  );
};
