import { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types/Message';

interface MessagesContextType {
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (message: Message) => void;
  chatId?: string;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{
  children: React.ReactNode;
  chatId?: string;
}> = ({ children, chatId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMessages([{ text: 'Hello' }, { text: 'World' }]);
        setLoading(false);
      }, 1000);
    }
  }, [chatId]);

  const addNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
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
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}; 