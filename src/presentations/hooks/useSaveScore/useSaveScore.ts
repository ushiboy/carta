import useSWRMutation from "swr/mutation";

import { Game, ScoreInfo } from "@/domains/models/carta";
import { useRepository } from "@/presentations/contexts/RepositoryContext";

type Args = {
  game: Game;
  score: ScoreInfo;
};

export function useSaveScore() {
  const { scoreRepository } = useRepository();

  const { trigger, isMutating } = useSWRMutation(
    scoreRepository.saveScore.name,
    (_, { arg }: { arg: Args }) => {
      return scoreRepository.saveScore(arg.game, arg.score);
    },
  );

  return {
    doSave: trigger,
    isMutating,
  };
}
