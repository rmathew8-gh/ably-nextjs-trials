export interface Message {
  text: string;
}

export interface MessagesProps {
  name?: string;
  chatId?: string;
}

export interface MessagesContextType {
  loading: boolean;
  error?: Error;
  messages: Message[];
  addNewMessage: (message: Message) => void;
  chatId?: string;
}
