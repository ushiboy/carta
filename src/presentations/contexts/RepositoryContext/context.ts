import { createContext } from "react";

import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";

type ContextState = {
  gameRepository: GameRepositoryInterface;
};

export const context = createContext(Object.create(null) as ContextState);
