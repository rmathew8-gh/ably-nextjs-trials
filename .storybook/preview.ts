import "../app/global.css";
import { initialize, mswDecorator } from "msw-storybook-addon";

// Initialize MSW
initialize();

export const decorators = [mswDecorator];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
