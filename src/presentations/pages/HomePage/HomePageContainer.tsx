import { HomePage } from "./HomePage";
import { useHomePage } from "./hooks";

export function HomePageContainer() {
  const { games, isLoading } = useHomePage();

  return <HomePage games={games} isLoading={isLoading} />;
}
