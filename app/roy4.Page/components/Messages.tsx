import { useMessages } from '../contexts/MessagesContext';

interface MessagesProps {
  chatId?: string;
}

export const Messages: React.FC<MessagesProps> = ({ chatId }) => {
  const { loading, messages } = useMessages();

  if (!chatId) {
    return <div className="p-4">Please select a chat</div>;
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          {message.text}
        </div>
      ))}
    </div>
  );
}; 