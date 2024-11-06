import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MessagesPage from "./page";
import { graphql, HttpResponse } from "msw";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy3/Page",
  component: MessagesPage,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = () => <MessagesPage />;

export const Default = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetChatsData", () => {
          return HttpResponse.json({
            data: {
              yourData: { name: "Mocked Chat Data" },
            },
          });
        }),
      ],
    },
  },
};