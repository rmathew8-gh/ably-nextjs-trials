import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  component: Message,
  title: "RoyComponents/Message",
  args: {
    id: 999,
    label: "Default Message",
    isActive: false,
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    id: 12,
    label: "Primary Message",
  },
};

export const Secondary: Story = {
  args: {
    id: 13,
    label: "Secondary Message",
    isActive: true,
  },
};
