import { Message } from "./Message";

interface MessagesProps {
  messages: Array<{
    id: string;
    label: string;
    isActive: boolean;
  }>;
}

export const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">
        <span>Messages</span>
      </div>
      <div className="border rounded-lg">
        {messages.length > 0 ? (
          <div className="p-2">
            {messages.map((message) => (
              <Message
                key={message.id}
                id={message.id}
                label={message.label}
                isActive={message.isActive}
              />
            ))}
          </div>
        ) : (
          <div className="p-2">
            <div className="text-sm text-gray-500">
              <p>No messages found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
