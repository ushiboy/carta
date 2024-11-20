import { createContext } from "react";

import { GameRepositoryInterface } from "@/infrastructures/repositories/GameRepository";
import { ScoreRepositoryInterface } from "@/infrastructures/repositories/ScoreRepository/ScoreRepository";

type ContextState = {
  gameRepository: GameRepositoryInterface;
  scoreRepository: ScoreRepositoryInterface;
};

export const context = createContext(Object.create(null) as ContextState);
