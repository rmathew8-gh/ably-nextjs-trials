import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://your-graphql-endpoint.com",
  cache: new InMemoryCache(),
});

export const HelloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
