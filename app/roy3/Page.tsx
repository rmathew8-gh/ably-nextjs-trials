import "../global.css";
import Messages from "./Messages";
import Chats from "./Chats";
import EditBox from "./EditBox";
import { useState } from "react";

export default function Page() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();

  return (
    <div className="page-container">
      <div className="page-column boxed">
        <Chats 
          selectedChatId={selectedChatId}
          onChatSelect={(chatId) => setSelectedChatId(chatId)} 
        />
      </div>
      <div className="page-column boxed">
        <div className="upper-section boxed">
          <Messages chatId={selectedChatId} />
        </div>
        <div className="lower-section boxed">
          <EditBox />
        </div>
      </div>
    </div>
  );
}
