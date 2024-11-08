import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MessagesProvider } from "./MessagesProvider";
import { graphql } from "msw";

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const meta: Meta<typeof Messages> = {
  title: "Components/Messages",
  component: Messages,
  decorators: [
    (Story) => (
      <ApolloProvider client={apolloClient}>
        <MessagesProvider>
          <Story />
        </MessagesProvider>
      </ApolloProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Messages>;

const mockMessages = [
  {
    id: "1",
    content: "Hello world!",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    content: "This is a test message",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetMessages", () => {
          return {
            data: {
              messages: mockMessages,
            },
          };
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetMessages", () => {
          return new Promise(() => {}); // Never resolves to simulate loading
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetMessages", (req, res, ctx) => {
          return res(
            ctx.errors([
              { message: "Failed to fetch messages" }
            ])
          );
        }),
      ],
    },
  },
};
