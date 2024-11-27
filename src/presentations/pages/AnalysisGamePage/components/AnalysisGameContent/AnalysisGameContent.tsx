import WordCloud from "react-d3-cloud";

type Props = {
  words: {
    text: string;
    value: number;
  }[];
};

export function AnalysisGameContent({ words }: Props) {
  return (
    <WordCloud
      data={words}
      height={300}
      fontWeight="bold"
      fontSize={(word) => Math.log2(word.value) * 5}
    />
  );
}
