import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  component: Message,
  title: "RoyComponents/Message",
  args: {
    label: "Default",
    isActive: false,
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    label: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    isActive: true,
  },
};
