import { useState } from 'react';
import { Chats } from './components/Chats';
import { Messages } from './components/Messages';
import { EditBox } from './components/EditBox';
import { MessagesProvider } from './contexts/MessagesContext';

export const Page: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <Chats 
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <MessagesProvider chatId={selectedChatId}>
          <div className="flex-1 overflow-auto">
            <Messages chatId={selectedChatId} />
          </div>
          <div className="p-4 border-t">
            <EditBox />
          </div>
        </MessagesProvider>
      </div>
    </div>
  );
}; 