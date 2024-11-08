import { createContext, useContext, ReactNode, useState } from "react";

interface Message {
  text: string;
}

interface MessagesContextType {
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (message: Message) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const addNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessagesContext.Provider
      value={{
        loading,
        error,
        messages,
        addNewMessage,
        setMessages,
        setLoading,
        setError,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider"
    );
  }
  return context;
}
