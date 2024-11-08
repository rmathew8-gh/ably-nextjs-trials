import React from "react";
import { Message } from "../types";

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="message-card">
      <p>{message.text}</p>
    </div>
  );
}
