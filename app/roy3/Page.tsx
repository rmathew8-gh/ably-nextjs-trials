import "../global.css";
import Messages, { MessagesContextProvider, MessagesProps } from "./Messages";
import Chats, { ChatsProvider, ChatsProps } from "./Chats";
import EditBox from "./EditBox";

export default function Page() {
  return (
    <div className="page-container">
      <div className="page-column boxed">
        <Chats />
      </div>
      <div className="page-column boxed">
        <div className="upper-section boxed">
          <Messages />
        </div>
        <div className="lower-section boxed">
          <EditBox />
        </div>
      </div>
    </div>
  );
}
