import { createContext, useState, useContext, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import MessageCard from "./MessageCard";

export interface MessagesProps {
  name?: string;
  chatId?: string;
}

export interface Message {
  text: string;
  // TODO: add other fields
}

const GET_HELLO_DATA = gql`
  query GetMessages($chatId: ID) {
    messages(chatId: $chatId) {
      text
    }
  }
`;

export const MessagesContext = createContext<{
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
}>({
  loading: true,
  messages: [],
  addNewMessage: () => {},
});

export function MessagesContextProvider({
  children,
  chatId,
}: {
  children: ReactNode;
  chatId?: string;
}) {
  const { loading, error, data } = useQuery(GET_HELLO_DATA, {
    variables: { chatId },
    skip: !chatId,
  });
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  function addNewMessage(newMessage: Message) {
    setNewMessages([...newMessages, newMessage]);
  }

  const combinedMessages = [...newMessages, ...(data?.messages || [])];

  return (
    <MessagesContext.Provider
      value={{
        loading,
        error,
        messages: combinedMessages,
        addNewMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

const Messages: React.FC<MessagesProps> = ({ chatId }) => {
  return (
    <MessagesContextProvider chatId={chatId}>
      <MessagesContent />
    </MessagesContextProvider>
  );
};

const MessagesContent: React.FC = () => {
  const { loading, error, messages } = useContext(MessagesContext);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Messages:</h1>
      {messages.map((message: Message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
