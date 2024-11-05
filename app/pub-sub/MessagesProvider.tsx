import { ReactNode, createContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
}

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  loading: false
});

interface MessagesProviderProps {
  children: ReactNode;
}

export function MessagesProvider({ children }: MessagesProviderProps) {
  const { data, loading, error } = useQuery(GET_MESSAGES);

  return (
    <MessagesContext.Provider value={{
      messages: data?.messages || [],
      loading,
      error
    }}>
      {children}
    </MessagesContext.Provider>
  );
} 