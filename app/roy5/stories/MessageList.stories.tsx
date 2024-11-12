import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "../components/MessageList";
import { MessagesProvider } from "../contexts/MessagesContext";
import { mockHandlers } from "../../common/handlers";

const meta: Meta<typeof MessageList> = {
  title: "Roy5/Component",
  component: MessageList,
  decorators: [
    (Story) => (
      <MessagesProvider
        initialMessages={[
          {
            id: "1",
            text: "Hello, welcome to the chat!",
            // sender: "System",
            timestamp: new Date(),
          },
          {
            id: "2",
            text: "How are you today?",
            sender: "Alice",
            // timestamp: new Date(),
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
  parameters: {
    msw: {
      handlers: [mockHandlers],
    },
  },
  args: {
    channelName: "test-channel",
  },
};
