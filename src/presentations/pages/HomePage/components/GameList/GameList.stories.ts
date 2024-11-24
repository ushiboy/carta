import { withRouter } from "storybook-addon-remix-react-router";

import { Game } from "@/domains/models/carta";

import { GameList } from "./GameList";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/HomePage/GameList",
  component: GameList,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GameList>;

export default meta;
type Story = StoryObj<typeof meta>;

const game: Game = {
  id: 1,
  title: "Hello world.",
};

export const データ1件表示: Story = {
  args: {
    games: [game],
  },
};

export const データN件表示: Story = {
  args: {
    games: [
      game,
      {
        id: 2,
        title: "test 2",
      },
      {
        id: 3,
        title: "test 3",
      },
    ],
  },
};
