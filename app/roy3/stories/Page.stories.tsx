import type { Meta, StoryObj } from "@storybook/react";
import Page from "../Page";
import { withProviders } from "../test-utils";
import { mockHandlers } from "../handlers";

const meta: Meta<typeof Page> = {
  title: "Roy/Page",
  component: Page,
  decorators: [withProviders],
  parameters: {
    // Default parameters that apply to all stories
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [mockHandlers],
    },
  },
};
