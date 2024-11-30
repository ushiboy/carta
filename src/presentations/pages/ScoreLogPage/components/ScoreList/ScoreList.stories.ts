import { withRouter } from "storybook-addon-remix-react-router";

import { ScoreLog } from "@/domains/models/carta";

import { ScoreList } from "./ScoreList";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/ScoreLogPage/ScoreList",
  component: ScoreList,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreList>;

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

export const データ0件表示: Story = {
  args: {
    scores: [],
    isLoading: false,
  },
};

export const データ読み込み中表示: Story = {
  args: {
    scores: [],
    isLoading: true,
  },
};

export const データ1件表示: Story = {
  args: {
    scores: [score],
    isLoading: false,
  },
};

export const データ複数件表示: Story = {
  args: {
    scores: [
      score,
      {
        ...score,
        id: 2,
      },
      {
        ...score,
        id: 3,
      },
    ],
    isLoading: false,
  },
};
