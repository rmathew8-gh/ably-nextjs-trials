import type { Meta, StoryObj } from "@storybook/react";
import { Messages } from "./Messages";
import { graphql, HttpResponse } from "msw";
import { mockMessages } from "./mocks/mockData";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MessagesProvider } from "./MessagesProvider";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

const providersDecorator = (Story: React.FC) => {
  return (
    <ApolloProvider client={apolloClient}>
      <MessagesProvider>
        <Story />
      </MessagesProvider>
    </ApolloProvider>
  );
};

const meta: Meta<typeof Messages> = {
  title: "RoyComponents/Messages",
  component: Messages,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (props) => <Messages {...props} />,
  decorators: [providersDecorator],
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
  args: {},
  parameters: {
    msw: {
      handlers: [createMessageHandler("empty")],
    },
  },
};

export const WithMessages: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [createMessageHandler("default")],
    },
  },
};

export const SingleMessage: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [createMessageHandler("single")],
    },
  },
};

export const LongMessages: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [createMessageHandler("long")],
    },
  },
};
