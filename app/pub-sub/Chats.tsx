import { Chat } from "./Chat";
import { useEffect, useState } from "react";

interface ChatsProps {
  chatElems?: Array<{
    id: string;
    label: string;
    isActive: boolean;
  }>;
}

export const Chats = ({ chatElems: initialChats = [] }: ChatsProps) => {
  const [chatElems, setChats] = useState(initialChats);

  useEffect(() => {
    const query = `
      query GetChats($limit: Int!) {
        chatElems(limit: $limit) {
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
      // TODO: fix this - it only handles the first result
      .then((result) => setChats(result.data.GetChats[0].participants));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">
        <span>Chats</span>
      </div>
      <div className="border rounded-lg">
        {chatElems.length > 0 ? (
          <div className="p-2">
            {chatElems.map((chatElem) => (
              <Chat
                key={chatElem.id}
                id={chatElem.id}
                label={chatElem.label}
                isActive={chatElem.isActive}
              />
            ))}
          </div>
        ) : (
          <div className="p-2">
            <div className="text-sm text-gray-500">
              <p>No chatElems found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
