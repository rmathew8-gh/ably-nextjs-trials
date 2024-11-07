import { useContext } from "react";
import { MessagesContext } from "./Messages";

export default function EditBox() {
  const { addNewMessage } = useContext(MessagesContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const message = formData.get("message") as string;
        addNewMessage({text: message});
    }

  return (
    <form className="edit-box" onSubmit={handleSubmit}>
      <textarea
        name="message"
        className="edit-textarea"
        placeholder="Enter your message..."
      />
      <button type="submit" className="edit-submit">
        Submit
      </button>
    </form>
  );
}
