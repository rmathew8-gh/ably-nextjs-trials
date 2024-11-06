import { ReactNode } from 'react';

interface MessagesLayoutProps {
  children: ReactNode;
}

export default function MessagesLayout({ children }: MessagesLayoutProps) {
  return (
    <div className="flex h-screen">
      <aside className="w-80 border-r border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold">Messages</h1>
          <div className="mt-4">
            <SearchBar />
          </div>
          <nav className="mt-4">
            <TabBar />
          </nav>
        </div>
        <MessagesList />
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
