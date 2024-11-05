import type { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./Chat";

const meta: Meta<typeof Chat> = {
  component: Chat,
  title: "RoyComponents/Chat",
  args: {
    id: "999",
    label: "Default Chat",
    isActive: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  args: {
    id: "12",
    label: "Chat 1",
  },
};

export const Secondary: Story = {
  args: {
    id: "13",
    label: "Chat 2",
    isActive: true,
  },
};
