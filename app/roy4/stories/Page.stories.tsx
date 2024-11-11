import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "../Page";
import { MessagesProvider } from "../contexts/MessagesContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mockHandlers } from "../../common/handlers";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

export const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const meta: Meta<typeof Page> = {
  title: "Roy4/Page",
  component: Page,
  decorators: [
    (Story) => (
      <ApolloProvider client={apolloClient}>
        <MessagesProvider chatId="mock-chat-id">
          <Story />
        </MessagesProvider>
      </ApolloProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [mockHandlers],
    },
  },
};
