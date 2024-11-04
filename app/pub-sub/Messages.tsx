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
    fetch("api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <div className="font-manrope text-sm whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
        <span className="uppercase">Messages</span>
      </div>
      <div className="flex flex-col justify-start items-start rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border bg-white">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-4 p-6 w-full">
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
          <div className="flex flex-row w-[752px] justify-start items-start gap-4 p-6">
            <div className="font-jetbrains-mono text-sm min-w-[219px] whitespace-nowrap text-slate-500 text-opacity-100 leading-normal font-medium">
              <p>No messages found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
