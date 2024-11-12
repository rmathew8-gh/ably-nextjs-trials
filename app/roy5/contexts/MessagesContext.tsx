import { createContext, useContext, useState, useEffect } from "react";
import { Message } from "../types/Message";
import { MessagesContextType } from "../types/MessageTypes";

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export interface MessagesProviderProps {
  children?: React.ReactNode;
  chatId?: string;
  initialMessages?: Message[];
}

// MessagesProvider can be initialized with initialMessages
// It then fetches additional messages from the remote.
export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
  chatId,
  initialMessages = [],
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const sampleMessages: Message[] = [
          {
            id: 1,
            text: "Hello, welcome to the chat!",
            sender: "System",
            timestamp: new Date(),
          },
          {
            id: 2,
            text: "How are you today?",
            sender: "Alice",
            timestamp: new Date(),
          },
        ];

        setMessages([...messages, ...sampleMessages]);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load messages"),
        );
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

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
