import { graphql, HttpResponse } from "msw";
import Chats from "./Chats";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy3/Chats",
  component: Chats,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Chats {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetChatsData", () => {
          return HttpResponse.json({
            data: {
              yourData: { name: "Mocked Data" },
            },
          });
        }),
      ],
    },
  },
};
