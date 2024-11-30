import { withRouter } from "storybook-addon-remix-react-router";

import { PlayResult } from "@/domains/models/carta";

import { ResultList } from "./ResultList";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/ScoreAnalysisPage/ResultList",
  component: ResultList,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResultList>;

export default meta;
type Story = StoryObj<typeof meta>;

const result: PlayResult = {
  id: 1,
  yomi: "yomi1",
  tori: "tori1",
  corrected: true,
};

export const データ0件表示: Story = {
  args: {
    results: [],
    isLoading: false,
  },
};

export const データ読み込み中表示: Story = {
  args: {
    results: [],
    isLoading: true,
  },
};

export const データ1件表示: Story = {
  args: {
    results: [result],
    isLoading: false,
  },
};

export const データ複数件表示: Story = {
  args: {
    results: [
      result,
      {
        ...result,
        id: 2,
      },
      {
        ...result,
        id: 3,
      },
    ],
    isLoading: false,
  },
};
