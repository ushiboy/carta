import {
  GameState,
  PairCard,
  PlayResult,
  ScoreInfo,
  ToriFudaInfo,
} from "@/domains/models/carta";
import { ShuffleRule } from "@/domains/rules/ShuffleRule";

export interface StartGame {
  (pairCards: PairCard[], shuffleRule?: ShuffleRule): GameState;
}

export interface TakeCard {
  (state: GameState, toriFuda: ToriFudaInfo): GameState;
}

export interface CalculateScore {
  (state: GameState): ScoreInfo;
}

export interface ConvertPlayResults {
  (state: GameState): PlayResult[];
}
