import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import "../src/index.css";

const customViewports = {
  desktop: {
    name: "Desktop",
    styles: {
      width: "1024px",
      height: "768px",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
      defaultViewport: "desktop",
    },
  },
};

export default preview;
