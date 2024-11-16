import { withRouter } from "storybook-addon-remix-react-router";

import { Game } from "@/domains/models/carta";

import { HomePage } from "./HomePage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/HomePage",
  component: HomePage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const game: Game = {
  id: 1,
  title: "Hello world.",
};

export const デフォルト表示: Story = {
  args: {
    games: [game],
    isLoading: false,
  },
};
