import { useState } from "react";
import { useMessagesContext } from "../contexts/MessagesContext";

export function EditBox() {
  const [text, setText] = useState("");
  const { addNewMessage } = useMessagesContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addNewMessage({ text });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
