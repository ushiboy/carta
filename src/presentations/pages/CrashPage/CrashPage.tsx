import { FallbackProps } from "react-error-boundary";
import { PageHeading, Stack, Text } from "smarthr-ui";

type Props = Omit<FallbackProps, "resetErrorBoundary">;

export function CrashPage({ error }: Props) {
  return (
    <div className="p-8">
      <Stack data-testid="crashPage">
        <PageHeading>予期せぬエラーが発生しました。</PageHeading>
        <Text>ブラウザをリロードしてください。</Text>
        <Text data-testid="message">{error.message}</Text>
      </Stack>
    </div>
  );
}
