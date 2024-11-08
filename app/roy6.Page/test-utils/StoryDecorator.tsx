import { ReactNode, useEffect } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { useMessagesContext } from "../contexts/MessagesContext";

interface MockData {
  selectedChatId?: string;
  messages?: Array<{ text: string }>;
  loading?: boolean;
  error?: Error;
}

export function MockDataDecorator({
  children,
  mockData,
}: {
  children: ReactNode;
  mockData?: MockData;
}) {
  const { setSelectedChatId } = useChatContext();
  const context = useMessagesContext() as any;

  useEffect(() => {
    if (mockData?.selectedChatId) {
      setSelectedChatId(mockData.selectedChatId);
    }
    if (mockData?.messages) {
      context.setMessages(mockData.messages);
    }
    if (mockData?.loading !== undefined) {
      context.setLoading(mockData.loading);
    }
    if (mockData?.error) {
      context.setError(mockData.error);
    }
  }, [mockData]);

  return <>{children}</>;
}
