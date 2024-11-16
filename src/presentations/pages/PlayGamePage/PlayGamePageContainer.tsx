import { PlayGamePage } from "./PlayGamePage";
import { usePlayGamePage } from "./hooks";

export function PlayGamePageContainer() {
  const { game, isLoading } = usePlayGamePage();
  return <PlayGamePage game={game} isLoading={isLoading} />;
}
