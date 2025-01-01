import { useErrorBoundary } from "react-error-boundary";
import { HashRouter } from "react-router";
import { SWRConfig } from "swr";

import { TextToSpeechAdapter } from "@/infrastructures/adapters/TextToSpeechAdapter";
import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";
import { GameRepository } from "@/infrastructures/repositories/GameRepository";
import { ScoreRepository } from "@/infrastructures/repositories/ScoreRepository";
import { AppRoutes } from "@/presentations/routes/AppRoutes";

import { AdapterContextProvider } from "./contexts/AdapterContext";
import { RepositoryContextProvider } from "./contexts/RepositoryContext";

type Props = {
  db: CartaDatabase;
};

export function App({ db }: Props) {
  const { showBoundary } = useErrorBoundary();
  return (
    <AdapterContextProvider textToSpeechAdapter={new TextToSpeechAdapter()}>
      <RepositoryContextProvider
        gameRepository={new GameRepository(db)}
        scoreRepository={new ScoreRepository(db)}
      >
        <HashRouter>
          <SWRConfig
            value={{
              onError(error, _key, _config) {
                showBoundary(error);
              },
            }}
          >
            <AppRoutes />
          </SWRConfig>
        </HashRouter>
      </RepositoryContextProvider>
    </AdapterContextProvider>
  );
}
