import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "../components/MessageList";
import { MessagesProvider } from "../contexts/MessagesContext";

const meta: Meta<typeof MessageList> = {
  title: "Roy5/Component",
  component: MessageList,
  decorators: [
    (Story) => (
      <MessagesProvider
        initialMessages={[
          {
            id: 1,
            text: "Hello, welcome to the chat!",
          },
          {
            id: 2,
            text: "How are you today?",
          },
        ]}
      >
        <Story />
      </MessagesProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  args: {
    channelName: "test-channel",
  },
};
