import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  component: Message,
  title: "RoyComponents/Message",
  args: {
    label: "Default Message",
    isActive: false,
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    label: "Primary Message",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Message",
    isActive: true,
  },
};
