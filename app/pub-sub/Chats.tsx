import { Chat } from "./Chat";
import { useEffect, useState } from "react";

interface ChatsProps {
  messages?: Array<{
    id: string;
    label: string;
    isActive: boolean;
  }>;
}

export const Chats = ({ messages: initialChats = [] }: ChatsProps) => {
  const [messages, setChats] = useState(initialChats);

  useEffect(() => {
    const query = `
      query GetChats($limit: Int!) {
        messages(limit: $limit) {
          id
          label
          isActive
        }
      }
    `;

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          limit: 10,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => setChats(result.data.messages));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">
        <span>Chats</span>
      </div>
      <div className="border rounded-lg">
        {messages.length > 0 ? (
          <div className="p-2">
            {messages.map((message) => (
              <Chat
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
