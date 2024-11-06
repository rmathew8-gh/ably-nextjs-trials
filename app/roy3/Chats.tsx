import { createContext, useContext, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";

export interface ChatsProps {
  name?: string;
}

export interface Chat {
  id: string;
  text: string;
  username: string;
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

const ChatsContext = createContext<{
  loading: boolean;
  error?: Error;
  chats: Chat[];
}>({
  loading: true,
  chats: [],
});

export function ChatsProvider({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  return (
    <ChatsContext.Provider
      value={{
        loading,
        error,
        chats: data?.chats || [],
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

const Chats: React.FC<ChatsProps> = () => {
  const { loading, error, chats } = useContext(ChatsContext);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Chats:</h1>
      {chats.map((chat: Chat) => (
        <div key={chat.id}>
          id: {chat.id}; {chat.text} by {chat.username}
        </div>
      ))}
    </div>
  );
};

export default Chats;
