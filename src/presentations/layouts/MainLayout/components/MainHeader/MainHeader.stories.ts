import { userEvent, within } from "@storybook/test";
import { withRouter } from "storybook-addon-remix-react-router";

import { MainHeader } from "./MainHeader";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "layouts/MainHeader",
  component: MainHeader,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const デスクトップデフォルト表示: Story = {};

export const デスクトップ設定メニュー表示: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("configMenuButton"));
  },
};

export const モバイルデフォルト表示: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const モバイルメニュー開表示: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("mobileMenuButton"));
  },
};
