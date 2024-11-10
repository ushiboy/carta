import { Game } from "@/domains/models/carta";

type Props = {
  games: Game[];
};

export function HomePage({ games }: Props) {
  return (
    <div data-testid="homePage">
      <h1>Hello world.</h1>
      {games.map((g) => (
        <p key={g.id}>{g.title}</p>
      ))}
    </div>
  );
}
