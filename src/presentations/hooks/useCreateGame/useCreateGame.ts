import useSWRMutation from "swr/mutation";

import { GameDraft } from "@/domains/models/carta";
import { useRepository } from "@/presentations/contexts/RepositoryContext";

export function useCreateGame() {
  const { gameRepository } = useRepository();

  const { trigger, isMutating } = useSWRMutation(
    gameRepository.createGame.name,
    (_, { arg }: { arg: GameDraft }) => {
      return gameRepository.createGame(arg);
    },
  );

  return {
    doCreate: trigger,
    isMutating,
  };
}
