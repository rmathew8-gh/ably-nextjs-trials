import { gql, useQuery } from "@apollo/client";
import { Chat, ChatCard } from "./ChatCard";

interface ChatsProps {
  selectedChatId?: string;
  onChatSelect?: (chatId: string) => void;
}

const GET_HELLO_DATA = gql`
  query GetChats {
    chats {
      id
      text
      username
    }
  }
`;

export const Chats: React.FC<ChatsProps> = ({
  selectedChatId,
  onChatSelect,
}) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Chats:</h1>
      {data?.chats?.map((chat: Chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          onClick={() => onChatSelect?.(chat.id)}
        />
      ))}
    </div>
  );
};
