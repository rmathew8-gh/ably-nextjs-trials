import { useChatContext } from "../contexts/ChatContext";

export function Chats() {
  const { selectedChatId, setSelectedChatId } = useChatContext();

  return <div className="chats">{/* Chat list implementation */}</div>;
}
