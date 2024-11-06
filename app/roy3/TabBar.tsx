export default function TabBar() {
  return (
    <div className="flex border-b border-gray-200">
      <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
        Focused
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-500">
        Other
      </button>
    </div>
  );
}
