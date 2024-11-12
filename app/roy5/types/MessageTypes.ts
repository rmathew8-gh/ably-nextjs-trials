import { Message } from "./Message";

// Base interface for shared message state
export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error?: Error;
}

// Context type extends base state and adds context-specific properties
export interface MessagesContextType extends MessagesState {
  addNewMessage: (message: Message) => void;
  chatId?: string;
}

// Component props extends base state and adds component-specific properties
export interface MessageListProps extends MessagesState {
  channelName: string;
}
