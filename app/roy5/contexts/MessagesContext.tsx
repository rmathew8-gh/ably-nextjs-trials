import { createContext, useContext, useState, useEffect } from "react";
import { Message } from "../types/Message";
import { MessagesContextType } from "../types/MessageTypes";
import { Realtime } from 'ably';

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

export interface MessagesProviderProps {
  children: React.ReactNode;
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
        // Initialize Ably
        const ably = new Realtime({ 
          authUrl: '/api/createTokenRequest', // You'll need to implement this endpoint
          clientId: 'your-client-id' 
        });

        // Get the channel
        const channel = ably.channels.get(chatId || 'default-channel');

        // Subscribe to messages
        await channel.subscribe('message', (ablyMessage) => {
          const message: Message = {
            id: ablyMessage.id,
            text: ablyMessage.data.text,
            sender: ablyMessage.data.sender,
            timestamp: new Date(ablyMessage.timestamp)
          };
          setMessages(prev => [...prev, message]);
        });

        // Get message history
        const history = await channel.history();
        const historicalMessages: Message[] = history.items.map(item => ({
          id: item.id,
          text: item.data.text,
          sender: item.data.sender,
          timestamp: new Date(item.timestamp)
        }));

        setMessages(historicalMessages);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load messages"));
        setLoading(false);
      }
    };

    loadMessages();

    // Cleanup function
    return () => {
      const ably = new Realtime({ authUrl: '/api/createTokenRequest' });
      const channel = ably.channels.get(chatId || 'default-channel');
      channel.unsubscribe();
      ably.close();
    };
  }, [chatId]);

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
