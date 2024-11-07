import React from 'react';
import { Message } from './Messages';

const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div
      style={{
        padding: '1rem',
        margin: '0.5rem 0',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {message.text}
    </div>
  );
};

export default MessageCard; 