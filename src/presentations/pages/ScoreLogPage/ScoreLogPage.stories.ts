import { withRouter } from "storybook-addon-remix-react-router";

import { ScoreLog } from "@/domains/models/carta";

import { ScoreLogPage } from "./ScoreLogPage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/ScoreLogPage",
  component: ScoreLogPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreLogPage>;

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

export const デフォルト表示: Story = {
  args: {
    scores: [score],
    isLoading: false,
  },
};
