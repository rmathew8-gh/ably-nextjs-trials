import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChatsProvider } from "./Chats";
import { MessagesContextProvider } from "./Messages";
import { ReactNode } from "react";

// Shared Apollo Client instance
export const testClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

// Unified provider wrapper
export const TestProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={testClient}>
      <ChatsProvider>
        <MessagesContextProvider>
          {children}
        </MessagesContextProvider>
      </ChatsProvider>
    </ApolloProvider>
  );
};

// Story decorator factory
export const withProviders = (Story: React.ComponentType) => (
  <TestProviders>
    <Story />
  </TestProviders>
); 