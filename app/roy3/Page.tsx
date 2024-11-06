import Messages, { MessagesProvider, MessagesProps } from "./Messages";
import Chats, { ChatsProvider, ChatsProps } from "./Chats";

export default function Page() {
  return (
    <>
      <Messages />
      <Chats />
    </>
  );
}
