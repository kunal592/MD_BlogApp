import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Search, User, Menu, X, Home, Rss, Edit3, BarChart2, Shield, LogOut, Info } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 pt-20" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-4" onClick={e => e.stopPropagation()}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input 
              type="text"
              placeholder="Search for blogs, authors, or tags..."
              className="w-full p-3 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    );
  };

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Feed', icon: Rss, page: 'feed' },
    { name: 'My Blogs', icon: Edit3, page: 'my-blogs' },
    { name: 'About Us', icon: Info, page: 'about' },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsNavOpen(!isNavOpen)} className="lg:hidden p-2"> <Menu size={24} /> </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DevDocks</h1>
          </div>

          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <item.icon size={16} className="mr-2" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button onClick={() => onNavigate('create-edit-blog')} className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
              Create Blog
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="p-2"> <Search size={20} /> </button>
            <button onClick={toggleTheme} className="p-2"> {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />} </button>

            <div className="relative" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 rounded-full">
                    <img src="/avatars/avatar-current.png" alt="User Profile" className="w-8 h-8 rounded-full"/>
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-2">
                        <div className="px-4 py-2 border-b dark:border-gray-600">
                            <p className="font-bold">John Doe</p>
                            <p className="text-sm text-gray-500">@john.doe</p>
                        </div>
                        <button onClick={() => onNavigate('admin-analytics')} className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><BarChart2 size={16} className="mr-2"/> Analytics</button>
                        <button onClick={() => onNavigate('admin-reported-content')} className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><Shield size={16} className="mr-2"/> Reported</button>
                        <div className="border-t dark:border-gray-600 my-2"></div>
                        <button onClick={() => onNavigate('login')} className="w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"><LogOut size={16} className="mr-2"/> Logout</button>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {isNavOpen && (
        <div className="lg:hidden border-t dark:border-gray-700 p-4 space-y-2">
            {navItems.map((item) => (
                <button key={item.name} onClick={() => { onNavigate(item.page); setIsNavOpen(false); }} className="w-full flex items-center px-4 py-3 rounded-lg text-base hover:bg-gray-100 dark:hover:bg-gray-800"><item.icon size={20} className="mr-3" />{item.name}</button>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
