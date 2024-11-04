import { Message } from "./Message";
import { useEffect, useState } from "react";

interface MessagesProps {
  messages?: Array<{
    id: string;
    label: string;
    isActive: boolean;
  }>;
}

export const Messages = ({ messages: initialMessages = [] }: MessagesProps) => {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const query = `
      query GetMessages($limit: Int!) {
        messages(limit: $limit) {
          id
          label
          isActive
        }
      }
    `;

    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          limit: 10
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => setMessages(result.data.messages));
  }, []);

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
