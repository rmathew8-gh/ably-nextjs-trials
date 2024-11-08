import { useContext } from "react";
import { MessagesContext } from "./MessagesProvider";
import { Message } from "./Message";

export const Messages: React.FC = () => {
  const { messages, loading, error } = useContext(MessagesContext);

  if (loading) return <div className="p-4">Loading messages...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading messages: {error.message}
      </div>
    );

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="p-4 text-gray-500">No messages found</div>
      ) : (
        messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))
      )}
    </div>
  );
};
