import React from 'react';
import { LayoutDashboard, Users, FileText, MessageSquare, ArrowLeft, ShieldQuestion } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onNavigate }) => {
  const navItems = [
    { name: 'Dashboard', page: 'admin-dashboard', icon: LayoutDashboard },
    { name: 'Users', page: 'admin-users', icon: Users },
    { name: 'Blogs', page: 'admin-blogs', icon: FileText },
    { name: 'Comments', page: 'admin-comments', icon: MessageSquare },
    { name: 'Queries', page: 'admin-queries', icon: ShieldQuestion },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {navItems.map(item => (
            <button
              key={item.name}
              onClick={() => onNavigate(item.page)}
              className="w-full flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-6">
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              <span>Back to Site</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
