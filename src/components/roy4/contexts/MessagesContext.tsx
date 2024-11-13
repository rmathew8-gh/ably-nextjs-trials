import { createContext, useContext, useState, useEffect } from "react";
import { Message } from "../types/Message";
import { useQuery, gql } from "@apollo/client";

interface MessagesContextType {
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (message: Message) => void;
  chatId?: string;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      # Add other message fields you need
    }
  }
`;

export const MessagesProvider: React.FC<{
  children: React.ReactNode;
  chatId?: string;
}> = ({ children, chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
  });

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const addNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessagesContext.Provider
      value={{ loading, error, messages, addNewMessage, chatId }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
