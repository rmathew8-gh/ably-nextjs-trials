export default function ChatView() {
  return (
    <div className="flex flex-col h-full">
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Parker Amoroso</h2>
          <button className="ml-auto">
            <span className="sr-only">More options</span>
            <DotsIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6">
        {/* Messages will go here */}
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <textarea 
              placeholder="Type a message..."
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

