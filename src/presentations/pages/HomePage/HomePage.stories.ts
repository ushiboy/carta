import { withRouter } from "storybook-addon-remix-react-router";

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

export const デフォルト表示: Story = {
  args: {
    games: [],
  },
};
