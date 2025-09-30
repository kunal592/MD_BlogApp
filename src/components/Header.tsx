import React from 'react';
import { Moon, Sun, Search, User, Menu, X, HomeIcon, BookOpen, UserCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onSearchToggle: () => void;
  onProfileToggle: () => void;
  isProfileOpen: boolean;
  onNavToggle: () => void;
  isNavOpen: boolean;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchToggle,
  onProfileToggle,
  isProfileOpen,
  onNavToggle,
  isNavOpen,
  onNavigate,
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', icon: HomeIcon, page: 'home' },
    { name: 'Blogs', icon: BookOpen, page: 'blogs' },
    { name: 'Profile', icon: UserCircle, page: 'profile' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Mobile Nav Toggle */}
            <button
              onClick={onNavToggle}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevBlog</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <item.icon size={16} className="mr-2" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={onSearchToggle}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onProfileToggle}
              className={`p-2 rounded-lg transition-colors ${
                isProfileOpen
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Toggle profile"
            >
              <User size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onNavigate(item.page);
                  onNavToggle(); // Close nav on selection
                }}
                className="w-full flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
