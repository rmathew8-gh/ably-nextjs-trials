import { Message } from '../types/Message';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  error?: Error;
}

export const MessageList = ({ messages, loading, error }: MessageListProps) => {
  if (loading) {
    return <div className="p-4 text-gray-600">Loading messages...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  if (messages.length === 0) {
    return <div className="p-4 text-gray-600">No messages yet</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((message) => (
        <div 
          key={message.id}
          className="p-3 rounded-lg bg-white shadow-sm border border-gray-200"
        >
          {message.sender && (
            <div className="text-sm text-gray-600 mb-1">{message.sender}</div>
          )}
          <div className="text-gray-800">{message.text}</div>
          {message.timestamp && (
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 