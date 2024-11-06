import "../global.css";
import Messages, { MessagesProvider, MessagesProps } from "./Messages";
import Chats, { ChatsProvider, ChatsProps } from "./Chats";

export default function Page() {
  return (
    <div className="page-container">
      <div className="page-column">
        <Messages />
      </div>
      <div className="page-column">
        <Chats />
      </div>
    </div>
  );
}
