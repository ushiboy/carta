import { withRouter } from "storybook-addon-remix-react-router";

import { NotFoundPage } from "./NotFoundPage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/NotFoundPage",
  component: NotFoundPage,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const デフォルト表示: Story = {};
