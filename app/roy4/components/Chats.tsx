interface ChatsProps {
  selectedChatId?: string;
  onChatSelect?: (chatId: string) => void;
}

export const Chats: React.FC<ChatsProps> = ({ selectedChatId, onChatSelect }) => {
  const mockChats = [
    { id: '1', name: 'Chat 1' },
    { id: '2', name: 'Chat 2' },
    { id: '3', name: 'Chat 3' },
  ];

  return (
    <div className="p-4">
      {mockChats.map(chat => (
        <div
          key={chat.id}
          className={`p-2 cursor-pointer rounded ${
            selectedChatId === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onChatSelect?.(chat.id)}
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
}; 