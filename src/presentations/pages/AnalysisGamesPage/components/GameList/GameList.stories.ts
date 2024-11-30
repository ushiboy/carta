import { withRouter } from "storybook-addon-remix-react-router";

import { Game } from "@/domains/models/carta";

import { GameList } from "./GameList";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/AnalysisGamesPage/GameList",
  component: GameList,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GameList>;

export default meta;
type Story = StoryObj<typeof meta>;

const game: Game = {
  id: 1,
  title: "test",
};

export const データ0件表示: Story = {
  args: {
    games: [],
    isLoading: false,
  },
};

export const データ読み込み中表示: Story = {
  args: {
    games: [],
    isLoading: true,
  },
};

export const データ1件表示: Story = {
  args: {
    games: [game],
    isLoading: false,
  },
};

export const データ複数件表示: Story = {
  args: {
    games: [
      game,
      {
        ...game,
        id: 2,
      },
      {
        ...game,
        id: 3,
      },
    ],
    isLoading: false,
  },
};
