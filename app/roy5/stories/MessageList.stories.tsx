import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "../components/MessageList";
import {
  MessagesProvider,
  MessagesProviderProps,
} from "../contexts/MessagesContext";

const meta: Meta<typeof MessageList> = {
  title: "Roy5/Component",
  component: MessageList,
  decorators: [
    (Story) => {
      const providerProps: MessagesProviderProps = {
        initialMessages: [
          {
            id: 1,
            text: "Hello, welcome to the chat!",
          },
          {
            id: 2,
            text: "How are you today?",
          },
        ],
      };

      return (
        <MessagesProvider {...providerProps}>
          <Story />
        </MessagesProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  // args are MessageListProps; directly passed to MessageList
  args: {
    channelName: "test-channel",
    messages: [{ text: "text", id: 101 }],
  },
};
