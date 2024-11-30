import { withRouter } from "storybook-addon-remix-react-router";

import { Game } from "@/domains/models/carta";

import { AnalysisGamesPage } from "./AnalysisGamesPage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/AnalysisGamesPage",
  component: AnalysisGamesPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnalysisGamesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const game: Game = {
  id: 1,
  title: "test",
};

export const デフォルト表示: Story = {
  args: {
    games: [game],
    isLoading: false,
  },
};
