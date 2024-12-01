import WordCloud from "react-d3-cloud";
import { Heading, Stack } from "smarthr-ui";

type Props = {
  words: {
    text: string;
    value: number;
  }[];
};

export function AnalysisGameContent({ words }: Props) {
  return (
    <Stack data-testid="analysisGameContent">
      <Heading>正答頻度</Heading>
      <WordCloud
        data={words}
        height={300}
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
      />
    </Stack>
  );
}
