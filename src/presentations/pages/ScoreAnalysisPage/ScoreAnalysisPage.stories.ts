import { withRouter } from "storybook-addon-remix-react-router";

import { ScoreLog, PlayResult } from "@/domains/models/carta";

import { ScoreAnalysisPage } from "./ScoreAnalysisPage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/ScoreAnalysisPage",
  component: ScoreAnalysisPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreAnalysisPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const score: ScoreLog = {
  id: 1,
  gameId: 10001,
  title: "Hello world.",
  corrected: 1,
  total: 2,
  createdAt: new Date("2024-01-01"),
};

const playResult: PlayResult = {
  id: 1,
  yomi: "yomi",
  tori: "tori",
  corrected: true,
};

export const デフォルト表示: Story = {
  args: {
    score: score,
    playResults: [playResult],
    isLoading: false,
  },
};
