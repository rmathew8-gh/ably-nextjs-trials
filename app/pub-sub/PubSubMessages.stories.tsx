import type { Meta, StoryObj } from "@storybook/react";
import { PubSubMessages } from "./pubsub-client";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
// import { rest } from 'msw';
// import { http, graphql, HttpResponse } from "msw";
import { http, HttpResponse } from "msw";
import { initialize, mswDecorator } from "msw-storybook-addon";

// Initialize MSW
initialize();

// Mock Ably client
const mockAblyClient = new Ably.Realtime({
  authUrl: "/token",
  authMethod: "POST",
});

const meta: Meta<typeof PubSubMessages> = {
  title: "Features/PubSub/PubSubMessages",
  component: PubSubMessages,
  decorators: [
    mswDecorator,
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
        // async version
        // http.post("/publish", async ({ request }) => {
        //   // Simulate server processing delay
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   return HttpResponse.json(
        //     {
        //       success: true,
        //       message: `Successfully published!`,
        //     },
        //     { status: 200 },
        //   );
        // }),
        // sync version

        // rest.post("/publish", async (req, res, ctx) => {
        //   const { text } = await req.json();
        //   // Simulate server processing delay
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   return res(
        //     ctx.status(200),
        //     ctx.json({
        //       success: true,
        //       message: `Successfully published: ${text}`,
        //     }),
        //   );
        // }),
        // // Mock the token endpoint that Ably uses
        // rest.post("/token", (req, res, ctx) => {
        //   return res(
        //     ctx.status(200),
        //     ctx.json({
        //       token: "mock.ably.token",
        //       expires: Date.now() + 3600000, // 1 hour from now
        //       capability: { "*": ["*"] },
        //     }),
        //   );
        // }),

        http.post("/publish", async ({ request }) => {
          console.log("Request URL:", request.url);
          console.log("Request method:", request.method);
          const body = await request.json();
          console.log("Request body:", body);
          // Simulate server processing delay
          // await new Promise((resolve) => setTimeout(resolve, 500));

          return HttpResponse.json(
            {
              success: true,
              message: `Successfully published: ${JSON.stringify(body)}`,
            },
            { status: 200 },
          );
        }),

        http.post("/token", () => {
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

// export const WithExistingMessages: Story = {
//   parameters: {
//     mockData: {
//       channel: {
//         messages: [
//           {
//             name: "update-from-client",
//             data: { text: "Test message 1 @ 2024-03-20T10:00:00.000Z" },
//           },
//           {
//             name: "update-from-server",
//             data: { text: "Test message 2 @ 2024-03-20T10:01:00.000Z" },
//           },
//         ],
//       },
//     },
//   },
// };

// Story showing error state
export const WithServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/publish", ({ request }) => {
          return HttpResponse.json(
            {
              success: false,
              error: "Internal Server Error",
            },
            { status: 501 },
          );
        }),

        // rest.post("/publish", (req, res, ctx) => {
        //   return res(
        //     ctx.status(500),
        //     ctx.json({
        //       success: false,
        //       error: "Internal Server Error",
        //     }),
        //   );
        // }),
      ],
    },
  },
};
