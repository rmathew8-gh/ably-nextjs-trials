import React, { createContext, useState, useContext, ReactNode } from "react";
import { Message, MessagesContextType } from "../types";

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

interface MessagesContextProviderProps {
  children: ReactNode;
  chatId?: string;
}

export function MessagesContextProvider({
  children,
  chatId,
}: MessagesContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  const addNewMessage = (message: Message) => {
    setNewMessages((prev) => [...prev, message]);
  };

  const value = {
    loading,
    error,
    messages: newMessages,
    addNewMessage,
    chatId,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error(
      "useMessages must be used within a MessagesContextProvider"
    );
  }
  return context;
}
