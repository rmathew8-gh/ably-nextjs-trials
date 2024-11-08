import { createContext, useContext, ReactNode, useState } from "react";

interface ChatContextType {
  selectedChatId: string | undefined;
  setSelectedChatId: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(
    undefined
  );

  return (
    <ChatContext.Provider value={{ selectedChatId, setSelectedChatId }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
