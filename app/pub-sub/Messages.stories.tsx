import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { graphql, HttpResponse } from "msw";
import { mockMessages } from "./mocks/mockData";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MessagesProvider } from './MessagesProvider';

const meta: Meta<typeof Messages> = {
  title: "RoyComponents/Messages",
  component: Messages,
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

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: undefined // MSW will handle the requests
});

export const SingleMessage: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("single")],
    },
  },
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

export const LongMessages: Story = {
  parameters: {
    msw: {
      handlers: [createMessageHandler("long")],
    },
  },
};
