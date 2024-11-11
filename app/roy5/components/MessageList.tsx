import { Message } from "../types/Message";
// import { useChannel } from "ably/react";
import { useMessages } from "../contexts/MessagesContext";
import { AblyProvider } from "ably/react";
import Ably from "ably";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  error?: Error;
  channelName: string;
}

const client = new Ably.Realtime(
  "EMQ9Tw.HHx6Qw:Zq5gDfhVD9_Ovdv_VlZATtQ00l53iQEsuoTDvO2HgaE",
);

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  loading,
  error,
  channelName,
}) => {
  const {
    messages: contextMessages,
    loading: contextLoading,
    error: contextError,
  } = useMessages();

  // Prefer props over context for loading/error states if provided
  const contextMessagesLoading = contextLoading;
  const contextMessagesError = contextError;

  // const { channel } = useChannel(channelName, (message) => {
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       id: parseInt(message.id || Date.now().toString()),
  //       text: message.data.text,
  //       sender: message.data.sender,
  //       timestamp: new Date(message.timestamp ?? Date.now()),
  //     },
  //   ]);
  // });

  if (contextMessagesLoading) {
    return <div className="p-4 text-gray-600">Loading messages...</div>;
  }

  if (contextMessagesError) {
    return (
      <div className="p-4 text-red-600">
        Error: {contextMessagesError.message}
      </div>
    );
  }

  if (contextMessages.length === 0) {
    return <div className="p-4 text-gray-600">No messages yet</div>;
  }

  return (
    <AblyProvider client={client}>
      <div className="flex flex-col gap-2 p-4">
        {contextMessages.map((message) => (
          <div
            key={message.id}
            className="p-3 rounded-lg bg-white shadow-sm border border-gray-200"
          >
            {/* {message.sender && (
              <div className="text-sm text-gray-600 mb-1">{message.sender}</div>
            )} */}
            <div className="text-gray-800">{message.text}</div>
              {/* {message.timestamp && (
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              )} */}
          </div>
        ))}
      </div>
    </AblyProvider>
  );
};
