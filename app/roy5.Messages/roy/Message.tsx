interface MessageProps {
  id: string;
  content: string;
  timestamp: string;
}

export const Message: React.FC<MessageProps> = ({ id, content, timestamp }) => {
  return (
    <div className="p-4 border rounded-lg mb-2 hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">#{id}</span>
        <time className="text-xs text-gray-400">
          {new Date(timestamp).toLocaleString()}
        </time>
      </div>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  );
};
