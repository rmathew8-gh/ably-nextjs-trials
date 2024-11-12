import { createContext, useContext, useState } from "react";
import { Message } from "../types/Message";

// arg-type for MessagesContext.Provider::value
interface MessagesContextType {
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (message: Message) => void;
  chatId?: string;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export interface MessagesProviderProps {
  children?: React.ReactNode;
  chatId?: string;
  initialMessages?: Message[];
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
  chatId,
  initialMessages = [],
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessagesContext.Provider
      value={{ loading: false, messages, addNewMessage, chatId }}
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
