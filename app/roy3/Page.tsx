import "../global.css";
import Messages, { MessagesProvider, MessagesProps } from "./Messages";
import Chats, { ChatsProvider, ChatsProps } from "./Chats";
import EditBox from "./EditBox";

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
        <div className="lower-section boxed">
          <EditBox />
        </div>
      </div>
    </div>
  );
}
