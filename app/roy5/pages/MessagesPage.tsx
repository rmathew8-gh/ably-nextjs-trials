import { MessageList } from "../components/MessageList";
import { MessagesProvider } from "../contexts/MessagesContext";

export const MessagesPage: React.FC = () => {
  return (
    <MessagesProvider>
      <div className="max-w-4xl mx-auto h-screen bg-gray-50">
        <header className="p-4 border-b bg-white">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        </header>
        <main className="h-[calc(100vh-4rem)] overflow-y-auto">
          <MessageList channelName="General" />
        </main>
      </div>
    </MessagesProvider>
  );
};
