import { HashRouter } from "react-router-dom";

import { CartaDatabase } from "@/infrastructures/drivers/dexieDriver";
import { GameRepository } from "@/infrastructures/repositories/GameRepository";
import { AppRoutes } from "@/presentations/routes/AppRoutes";

import { RepositoryContextProvider } from "./contexts/RepositoryContext";

type Props = {
  db: CartaDatabase;
};

export function App({ db }: Props) {
  return (
    <RepositoryContextProvider gameRepository={new GameRepository(db)}>
      <HashRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <AppRoutes />
      </HashRouter>
    </RepositoryContextProvider>
  );
}
