import { useContext, useState } from "react";
import { MessagesContext } from "./Messages";

interface EditBoxProps {
  chatId: string | undefined;
}

export default function EditBox({ chatId }: EditBoxProps) {
  // will rerender if MessagesContext changes
  const { addNewMessage } = useContext(MessagesContext);
  const [text, setText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim() || !chatId) return;

    // const formData = new FormData(event.target as HTMLFormElement);
    // const message = formData.get("message") as string;
    addNewMessage({ text });
    setText("");
  }

  return (
    <div>
      <h2 className="edit-box-title">Message Input {chatId ? chatId : ""}</h2>
      <form className="edit-box" onSubmit={handleSubmit}>
        <textarea
          name="message"
          value={text}
          className="edit-textarea"
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your message..."
          disabled={!chatId}
        />
        <button
          type="submit"
          className="edit-submit disabled:bg-gray-300"
          disabled={!chatId || !text}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
