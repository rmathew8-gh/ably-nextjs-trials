import { useChatContext } from "../contexts/ChatContext";
import { useMessagesContext } from "../contexts/MessagesContext";

export function Messages() {
  const { selectedChatId } = useChatContext();
  const { messages, loading, error } = useMessagesContext();

  if (!selectedChatId) {
    return <div>Select a chat to start messaging</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div key={index} className="message">
          {message.text}
        </div>
      ))}
    </div>
  );
}
