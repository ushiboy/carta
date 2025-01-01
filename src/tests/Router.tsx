import { MemoryRouter } from "react-router";

type Props = {
  initPath?: string;
  children: React.ReactNode;
};

export function Router({ initPath, children }: Props) {
  return (
    <MemoryRouter initialEntries={[initPath || "/"]}>{children}</MemoryRouter>
  );
}
