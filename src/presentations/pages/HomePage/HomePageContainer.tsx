import { HomePage } from "./HomePage";
import { useHomePage } from "./hooks";

export function HomePageContainer() {
  const { games } = useHomePage();

  return <HomePage games={games} />;
}
