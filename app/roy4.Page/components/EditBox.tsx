import { useState } from 'react';
import { useMessages } from '../contexts/MessagesContext';

export const EditBox: React.FC = () => {
  const [text, setText] = useState('');
  const { addNewMessage, chatId } = useMessages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !chatId) return;

    addNewMessage({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          disabled={!chatId}
        />
        <button
          type="submit"
          disabled={!chatId}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}; 