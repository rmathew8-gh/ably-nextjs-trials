import { ChatProvider } from "../contexts/ChatContext";
import { MessagesProvider } from "../contexts/MessagesContext";
import { Chats } from "./Chats";
import { Messages } from "./Messages";
import { EditBox } from "./EditBox";

export function Page() {
  return (
    <ChatProvider>
      <MessagesProvider>
        <div className="page" style={{ width: "66.67%", margin: "0 auto" }}>
          <div style={{ border: "1px solid gray", marginBottom: "1rem" }}>
            <h3>Chats:</h3>
            <Chats />
          </div>

          <div className="chat-area">
            <div style={{ border: "1px solid gray", marginBottom: "1rem" }}>
              <h3>Messages:</h3>
              <Messages />
            </div>

            <div style={{ border: "1px solid gray" }}>
              <h3>EditBox:</h3>
              <EditBox />
            </div>
          </div>
        </div>
      </MessagesProvider>
    </ChatProvider>
  );
}
