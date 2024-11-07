import { createContext, useState, useContext, ReactNode } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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

const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
      text
    }
  }
`;

export const MessagesContext = createContext<{
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
  chatId?: string;
}>({
  loading: true,
  messages: [],
  addNewMessage: () => {},
  chatId: undefined,
});

export function MessagesContextProvider({
  children,
  chatId,
}: {
  children: ReactNode;
  chatId?: string;
}) {
  console.log('MessagesContextProvider chatId:', chatId);
  const { loading, error, data } = useQuery(GET_HELLO_DATA, {
    variables: { chatId },
    skip: !chatId,
  });
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  async function addNewMessage(newMessage: Message) {
    setNewMessages([...newMessages, newMessage]);

    if (chatId) {
      try {
        await sendMessage({
          variables: {
            chatId,
            text: newMessage.text,
          },
        });
      } catch (error) {
        console.error('Failed to send message:', error);
        // You might want to handle the error appropriately here
      }
    }
  }

  const combinedMessages = [...newMessages, ...(data?.messages || [])];

  return (
    <MessagesContext.Provider
      value={{
        loading,
        error,
        messages: combinedMessages,
        addNewMessage,
        chatId,
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
  const { loading, error, messages, chatId } = useContext(MessagesContext);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Messages{chatId ? ` (Chat ${chatId})` : ''}</h1>
      {messages.map((message: Message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
