import { HashRouter } from "react-router-dom";

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
  return (
    <AdapterContextProvider textToSpeechAdapter={new TextToSpeechAdapter()}>
      <RepositoryContextProvider
        gameRepository={new GameRepository(db)}
        scoreRepository={new ScoreRepository(db)}
      >
        <HashRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <AppRoutes />
        </HashRouter>
      </RepositoryContextProvider>
    </AdapterContextProvider>
  );
}
