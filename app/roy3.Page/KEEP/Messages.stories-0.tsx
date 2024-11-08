import { graphql, HttpResponse } from "msw";
import Messages from "./Messages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy3/Messages",
  component: Messages,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Messages {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetMessagesData", () => {
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
