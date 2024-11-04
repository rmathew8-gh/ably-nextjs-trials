import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { graphql, HttpResponse } from "msw";
import { mockMessages } from "./mockMessageData";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

// Create a mock Ably client
const mockAbly = {
  connection: {
    state: 'connected',
  },
  channels: {
    get: () => ({
      publish: async () => {},
      subscribe: (callback: Function) => {
        // Simulate incoming messages
        setTimeout(() => {
          callback({
            id: 'mock-id',
            data: {
              label: 'Mock realtime message',
              isActive: true
            }
          });
        }, 1000);
        return () => {}; // Cleanup function
      },
    }),
  },
} as unknown as Ably.Realtime;

const meta: Meta<typeof Messages> = {
  title: "RoyComponents/Messages",
  component: Messages,
  decorators: [
    (Story) => (
      <AblyProvider client={mockAbly}>
        <ChannelProvider channelName="messages-channel">
          <Story />
        </ChannelProvider>
      </AblyProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Messages>;

const createMessageHandler = (type: keyof typeof mockMessages) => {
  return graphql.query("GetMessages", ({ variables }) => {
    const messageType = variables.type || type;
    return HttpResponse.json({
      data: {
        messages: mockMessages[messageType as keyof typeof mockMessages],
      },
    });
  });
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("empty")],
    },
  },
};

export const WithMessages: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("default")],
    },
  },
};

export const SingleMessage: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("single")],
    },
  },
};

export const LongMessages: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("long")],
    },
  },
};

// Example of creating different mock behaviors
const createMockAbly = (messages: any[]) => ({
  connection: {
    state: 'connected',
  },
  channels: {
    get: () => ({
      publish: async () => {},
      subscribe: (callback: Function) => {
        messages.forEach((msg, index) => {
          setTimeout(() => {
            callback({
              id: `mock-id-${index}`,
              data: msg
            });
          }, 1000 * (index + 1));
        });
        return () => {};
      },
    }),
  },
} as unknown as Ably.Realtime);

export const WithRealtimeMessages: Story = {
  decorators: [
    (Story) => (
      <AblyProvider client={createMockAbly([
        { label: 'First message', isActive: true },
        { label: 'Second message', isActive: false },
      ])}>
        <ChannelProvider channelName="messages-channel">
          <Story />
        </ChannelProvider>
      </AblyProvider>
    ),
  ],
};
