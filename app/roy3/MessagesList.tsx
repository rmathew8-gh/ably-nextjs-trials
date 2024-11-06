interface Message {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  date?: string;
}

export default function MessagesList() {
  const messages: Message[] = [
    {
      id: '1',
      name: 'Parker Amoro',
      lastMessage: 'Hey Parker',
      date: 'Nov 6'
    },
    // Add more messages as needed
  ];

  return (
    <div className="overflow-y-auto h-[calc(100vh-140px)]">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  return (
    <div className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
        {message.avatar ? (
          <img 
            src={message.avatar} 
            alt={message.name}
            className="w-full h-full rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {message.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{message.name}</span>
          {message.date && (
            <span className="text-sm text-gray-500">{message.date}</span>
          )}
        </div>
        {message.lastMessage && (
          <p className="text-sm text-gray-500 truncate">{message.lastMessage}</p>
        )}
      </div>
    </div>
  );
}
