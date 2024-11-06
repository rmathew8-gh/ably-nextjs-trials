import Chats, { ChatsProvider, ChatsProps } from "./Chats";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { mockHandlers } from "./handlers";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const StoryComponent = (Story: React.ComponentType) => (
  <ApolloProvider client={client}>
    <ChatsProvider>
      <Story />
    </ChatsProvider>
  </ApolloProvider>
);

export default {
  title: "Roy/Chats",
  component: Chats,
  decorators: [StoryComponent],
};

const Template = (args: ChatsProps) => <Chats {...args} />;

export const LoadingState = Template.bind({});
export const ErrorState = Template.bind({});

export const SuccessState = Template.bind({});
SuccessState.args = {
  name: "Default Name",
};
SuccessState.parameters = {
  msw: {
    handlers: [mockHandlers],
  },
};
