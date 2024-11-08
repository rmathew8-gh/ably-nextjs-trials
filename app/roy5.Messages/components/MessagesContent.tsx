import React from "react";
import { useMessages } from "../contexts/MessagesContext";
import { MessageCard } from "./MessageCard";

export function MessagesContent() {
  const { loading, error, messages, chatId } = useMessages();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chatId) {
    return <div>No chat selected</div>;
  }

  return (
    <div className="messages-content">
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
}
