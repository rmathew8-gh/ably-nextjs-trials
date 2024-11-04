import "../app/global.css";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

export const loaders = [mswLoader];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
