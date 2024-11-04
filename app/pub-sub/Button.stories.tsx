import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// Define metadata for the component
const meta: Meta<typeof Button> = {
  component: Button,
  title: "RoyComponents/Button",
};

export default meta;

// Define the story types
type Story = StoryObj<typeof Button>;

// Create stories
export const Primary: Story = {
  args: {
    label: "Click me",
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Click me",
    primary: false,
  },
};
