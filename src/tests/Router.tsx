import { MemoryRouter } from "react-router";

type Props = {
  initPath?: string;
  children: React.ReactNode;
};

export function Router({ initPath, children }: Props) {
  return (
    <MemoryRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
      initialEntries={[initPath || "/"]}
    >
      {children}
    </MemoryRouter>
  );
}
