import { useContext } from "react";
import { MessagesContext } from "./Messages";

interface EditBoxProps {
  chatId: string | undefined;
}

export default function EditBox({ chatId }: EditBoxProps) {
  // will rerender if MessagesContext changes
  const { addNewMessage } = useContext(MessagesContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const message = formData.get("message") as string;
    addNewMessage({ text: message });
  }

  return (
    <div>
      <h2 className="edit-box-title">Message Input {chatId ? chatId : ""}</h2>
      <form className="edit-box" onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="edit-textarea"
          placeholder="Enter your message..."
          disabled={!chatId}
        />
        <button
          type="submit"
          className="edit-submit disabled:bg-gray-300"
          disabled={!chatId}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
