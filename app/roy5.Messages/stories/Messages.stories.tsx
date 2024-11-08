import React from "react";
import { Messages } from "../components/Messages";

export default {
  title: "Roy5/Messages",
  component: Messages,
};

export const Default = {
  args: {
    name: "Chat Room",
    chatId: "chat-1",
  },
};

export const Loading = {
  args: {
    name: "Loading Chat",
    chatId: "loading-chat",
  },
};

export const NoChat = {
  args: {
    name: "No Chat Selected",
  },
};
