import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { graphql, HttpResponse } from "msw";
import { mockMessages } from "./mockMessageData";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

// Create Ably client
const client = new Ably.Realtime({ authUrl: '/token', authMethod: 'POST' });

const meta: Meta<typeof Messages> = {
  title: "RoyComponents/Messages",
  component: Messages,
  decorators: [
    (Story) => (
      <AblyProvider client={client}>
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
