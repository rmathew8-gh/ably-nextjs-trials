import { createContext, useContext, useState } from "react";

// Define Message type inline
interface Message {
  id: string;
  text: string;
}

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

export const MessagesProvider: React.FC<{
  children: React.ReactNode;
  chatId?: string;
  initialMessages?: Message[];
}> = ({ children, chatId }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello there!" },
    { id: "2", text: "How are you?" },
    { id: "3", text: "Welcome to the chat!" },
  ]);

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
