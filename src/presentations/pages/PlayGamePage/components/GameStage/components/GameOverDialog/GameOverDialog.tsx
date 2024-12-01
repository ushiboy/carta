import { Button, Cluster, Dialog, Heading, Stack, Text } from "smarthr-ui";

import { ScoreInfo } from "@/domains/models/carta";

type Props = {
  open: boolean;
  scoreInfo: ScoreInfo;
  onRetry: () => void;
  onFinish: () => void;
};

export function GameOverDialog({ open, scoreInfo, onRetry, onFinish }: Props) {
  return (
    <Dialog data-testid="gameOverDialog" isOpen={open} className="w-60 md:w-96">
      <Stack gap={0} as="section" className="divide-y">
        <Heading className="px-6 py-4">
          <Text size="L" leading="TIGHT">
            ゲーム終了
          </Text>
        </Heading>
        <Stack gap={0.25} className="p-6">
          <Text>正答数: {scoreInfo.corrected}</Text>
          <Text>誤答数: {scoreInfo.incorrected}</Text>
          <div
            className="my-2 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow={scoreInfo.rate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full bg-blue-600 text-center text-xs text-white transition duration-500 dark:bg-blue-500"
              style={{ width: `${scoreInfo.rate}%` }}
            />
          </div>
        </Stack>
        <Cluster justify="flex-end" className="px-6 py-4">
          <Button onClick={onRetry}>リトライ</Button>
          <Button variant="primary" onClick={onFinish}>
            終了する
          </Button>
        </Cluster>
      </Stack>
    </Dialog>
  );
}
