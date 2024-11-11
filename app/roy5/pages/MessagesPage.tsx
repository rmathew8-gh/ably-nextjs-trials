import { useEffect, useState } from "react";
import { MessageList } from "../components/MessageList";
import { Message } from "../types/Message";

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  // Simulate loading messages
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

        setMessages(sampleMessages);
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

  return (
    <div className="max-w-4xl mx-auto h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
      </header>
      <main className="h-[calc(100vh-4rem)] overflow-y-auto">
        <MessageList 
          messages={messages} 
          loading={loading} 
          error={error}
          channelName="General"
        />
      </main>
    </div>
  );
};
