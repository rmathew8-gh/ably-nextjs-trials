import React from "react";
import { MessagesProps } from "../types";
import { MessagesContextProvider } from "../contexts/MessagesContext";
import { MessagesContent } from "./MessagesContent";

export function Messages({ name, chatId }: MessagesProps) {
  return (
    <MessagesContextProvider chatId={chatId}>
      <div className="messages-container">
        {name && <h2>{name}</h2>}
        <MessagesContent />
      </div>
    </MessagesContextProvider>
  );
}
