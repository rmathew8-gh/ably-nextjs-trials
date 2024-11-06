import Messages, { MessagesProvider, MessagesProps } from "./Messages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mockHandlers } from "./handlers";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Messages",
  component: Messages,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <MessagesProvider>
          <Story />
        </MessagesProvider>
      </ApolloProvider>
    ),
  ],
};

const Template = (args: MessagesProps) => <Messages {...args} />;

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