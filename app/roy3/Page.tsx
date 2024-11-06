import "../global.css";
import Messages, { MessagesProvider, MessagesProps } from "./Messages";
import Chats, { ChatsProvider, ChatsProps } from "./Chats";

export default function Page() {
  return (
    <div className="page-container">
      <div className="page-column boxed">
        <Messages />
      </div>
      <div className="page-column boxed">
        <div className="upper-section boxed">
          <Chats />
        </div>
        <div className="lower-section boxed">editor goes here</div>
      </div>
    </div>
  );
}
