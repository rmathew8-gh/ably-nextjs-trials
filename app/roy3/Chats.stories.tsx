import Chats, { ChatsProvider, ChatsProps } from "./Chats";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mockHandlers } from "./handlers";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Chats",
  component: Chats,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <ChatsProvider>
          <Story />
        </ChatsProvider>
      </ApolloProvider>
    ),
  ],
};

const Template = (args: ChatsProps) => <Chats {...args} />;

export const SuccessState = {
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
