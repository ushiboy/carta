import { withRouter } from "storybook-addon-remix-react-router";

import { Game } from "@/domains/models/carta";

import { GameListItem } from "./GameListItem";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/HomePage/GameList/GameListItem",
  component: GameListItem,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GameListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const game: Game = {
  id: 1,
  title: "Hello world.",
};

export const デフォルト表示: Story = {
  args: {
    game,
  },
};

export const 長いタイトルの表示: Story = {
  args: {
    game: {
      ...game,
      title: "long ".repeat(50),
    },
  },
};
