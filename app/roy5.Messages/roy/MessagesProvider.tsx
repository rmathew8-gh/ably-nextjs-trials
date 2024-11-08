import { ReactNode, createContext, useContext } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      timestamp
    }
  }
`;

interface Message {
  id: string;
  content: string;
  timestamp: string;
}

interface MessagesContextType {
  messages: Message[];
  loading: boolean;
  error?: Error;
  refetch: () => Promise<any>;
}

const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  loading: false,
  error: undefined,
  refetch: async () => {},
});

export const useMessages = () => useContext(MessagesContext);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { data, loading, error, refetch } = useQuery(GET_MESSAGES, {
    // Poll every 30 seconds for new messages
    pollInterval: 30000,
    // Handle errors
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return (
    <MessagesContext.Provider
      value={{
        messages: data?.messages || [],
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
