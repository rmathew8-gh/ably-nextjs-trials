import { Meta, StoryObj } from "@storybook/react";
import { Page } from "../components/Page";
import { ChatProvider } from "../contexts/ChatContext";
import { MessagesProvider } from "../contexts/MessagesContext";
import { MockDataDecorator } from "../test-utils/StoryDecorator";

const meta: Meta<typeof Page> = {
  title: "Roy6/Page",
  component: Page,
  decorators: [
    (Story, context) => (
      <ChatProvider>
        <MessagesProvider>
          <MockDataDecorator mockData={context.parameters.mockData}>
            <div style={{ height: "100vh", width: "100vw" }}>
              <Story />
            </div>
          </MockDataDecorator>
        </MessagesProvider>
      </ChatProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  name: "Default View",
};

// Mock the context values for testing different states
export const WithSelectedChat: Story = {
  name: "With Selected Chat",
  parameters: {
    mockData: {
      selectedChatId: "chat-1",
      messages: [
        { text: "Hello there!" },
        { text: "How are you?" },
        { text: "This is a test message" },
      ],
    },
  },
};

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    mockData: {
      selectedChatId: "chat-1",
      loading: true,
    },
  },
};

export const ErrorStory: Story = {
  name: "Error State",
  parameters: {
    mockData: {
      selectedChatId: "chat-1",
      error: new Error("Failed to load messages"),
    },
  },
};

export const EmptyMessages: Story = {
  name: "Empty Messages",
  parameters: {
    mockData: {
      selectedChatId: "chat-1",
      messages: [],
    },
  },
};
