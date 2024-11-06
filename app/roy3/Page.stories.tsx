import Page from "./Page";
import { ChatsProvider } from "./Chats";
import { MessagesProvider } from "./Messages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mockHandlers } from "./handlers";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const PageComponent = (Story: React.ComponentType) => (
  <ApolloProvider client={client}>
    <ChatsProvider>
      <MessagesProvider>
        <Story />
      </MessagesProvider>
    </ChatsProvider>
  </ApolloProvider>
);

export default {
  title: "Roy/Page",
  component: Page,
  decorators: [PageComponent],
};

const Template = () => <Page />;

export const Default = {
  render: Template,
  args: {
    name: "Default Name",
  },
  parameters: {
    msw: {
      handlers: [mockHandlers],
    },
  },
};
