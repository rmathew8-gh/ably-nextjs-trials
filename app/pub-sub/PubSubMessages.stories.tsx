import type { Meta, StoryObj } from "@storybook/react";
import { PubSubMessages } from "./pubsub-client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { http, HttpResponse } from "msw";

const mockAblyClient = new Ably.Realtime({
  authUrl: "/token",
  authMethod: "POST",
});

const meta: Meta<typeof PubSubMessages> = {
  title: "Features/PubSub/PubSubMessages",
  component: PubSubMessages,
  decorators: [
    // mswDecorator,
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
      handlers: [
        http.post("/publish", async ({}) => {
          return HttpResponse.json(
            {
              success: true,
              message: `Successfully published`,
            },
            { status: 200 },
          );
        }),

        http.post("/token", ({}) => {
          return HttpResponse.json({
            token: "mock.ably.token",
            expires: Date.now() + 3600000, // 1 hour from now
            capability: { "*": ["*"] },
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PubSubMessages>;

export const Default: Story = {};

export const WithServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/publish", ({}) => {
          return HttpResponse.json(
            {
              success: false,
              error: "Internal Server Error",
            },
            { status: 501 },
          );
        }),
      ],
    },
  },
};
