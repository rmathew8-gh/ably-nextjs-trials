export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Messages"
        className="w-full px-4 py-2 pl-10 border rounded-lg bg-gray-50"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon className="w-4 h-4 text-gray-400" />
      </span>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );
}

