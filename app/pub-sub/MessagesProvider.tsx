import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query xGetMessages {
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
  addNewMessage: (message: string) => void;
  messages: Message[];
  loading: boolean;
  error?: Error;
}

export const MessagesContext = createContext<MessagesContextType>({
  addNewMessage: () => {},
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
        addNewMessage: () => {},
        messages: data?.messages || [],
        loading,
        error,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
