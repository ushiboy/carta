import { Button, Cluster, Dialog, Heading, Stack, Text } from "smarthr-ui";

import { GameDetail } from "@/domains/models/carta";

type Props = {
  open: boolean;
  game: GameDetail;
  onStart: () => void;
};

export function GameStartDialog({ open, game, onStart }: Props) {
  return (
    <Dialog
      data-testid="gameStartDialog"
      isOpen={open}
      className="w-60 md:w-96"
    >
      <Stack gap={0} as="section" className="divide-y">
        <Heading className="px-6 py-4">
          <Text size="L" leading="TIGHT">
            ゲーム開始
          </Text>
        </Heading>
        <div className="p-6">
          <Text>{game.title}を開始します。</Text>
        </div>
        <Cluster justify="flex-end" className="px-6 py-4">
          <Button variant="primary" onClick={onStart}>
            スタート
          </Button>
        </Cluster>
      </Stack>
    </Dialog>
  );
}
