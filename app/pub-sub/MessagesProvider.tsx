import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages($chatId: ID) {
    messages(chatId: $chatId) {
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
      text
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
}

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  loading: false,
});

interface MessagesProviderProps {
  children: ReactNode;
}

export function MessagesProvider({ children }: MessagesProviderProps) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });

  return (
    <MessagesContext.Provider
      value={{
        messages: data?.messages || [],
        loading,
        error,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
