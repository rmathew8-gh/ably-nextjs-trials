import { createContext, useContext, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";

export interface MessagesProps {
  name?: string;
}

export interface Message {
  text: string;
}

const GET_HELLO_DATA = gql`
  query GetMessages {
    messages {
      text
    }
  }
`;

const MessagesContext = createContext<{
  loading: boolean;
  error?: Error;
  messages: Message[];
}>({
  loading: true,
  messages: [],
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  return (
    <MessagesContext.Provider
      value={{
        loading,
        error,
        messages: data?.messages || [],
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

const Messages: React.FC<MessagesProps> = () => {
  const { loading, error, messages } = useContext(MessagesContext);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Messages:</h1>
      {messages.map((message: Message, index) => (
        <div key={index}>{message.text}</div>
      ))}
    </div>
  );
};

export default Messages;
