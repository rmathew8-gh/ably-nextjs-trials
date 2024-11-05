import type { Meta, StoryObj } from "@storybook/react";
import { PubSubMessages } from "./pubsub-client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { mockHandlers, errorHandlers } from "./mocks/handlers";

const mockAblyClient = new Ably.Realtime({
  authUrl: "/token",
  authMethod: "POST",
});

const meta: Meta<typeof PubSubMessages> = {
  title: "RoyComponents/PubSubMessages",
  component: PubSubMessages,
  decorators: [
    (Story) => (
      <AblyProvider client={mockAblyClient}>
        <ChannelProvider channelName="status-updates">
          <Story />
        </ChannelProvider>
      </AblyProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    msw: {
      handlers: [...mockHandlers],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PubSubMessages>;

export const Default: Story = {};

export const WithServerError: Story = {
  parameters: {
    msw: {
      handlers: [...mockHandlers, ...errorHandlers],
    },
  },
};
