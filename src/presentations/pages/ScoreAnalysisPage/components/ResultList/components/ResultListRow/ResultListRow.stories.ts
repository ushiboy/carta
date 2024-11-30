import { withRouter } from "storybook-addon-remix-react-router";

import { PlayResult } from "@/domains/models/carta";

import { ResultListRow } from "./ResultListRow";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/ScoreAnalysisPage/ResultList/ResultListRow",
  component: ResultListRow,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResultListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const result: PlayResult = {
  id: 1,
  yomi: "yomi1",
  tori: "tori1",
  corrected: true,
};

export const correctedがtrueの場合: Story = {
  args: {
    result: {
      ...result,
      corrected: true,
    },
  },
};

export const correctedがfalseの場合: Story = {
  args: {
    result: {
      ...result,
      corrected: false,
    },
  },
};
