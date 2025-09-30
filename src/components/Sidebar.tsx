import React, { useState } from 'react';
import { Calendar, Clock, Tag, X } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '../data/blogPosts';

interface SidebarProps {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  onPostSelect: (post: BlogPost) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  posts,
  selectedPost,
  onPostSelect,
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  isSearchOpen,
  onSearchClose
}) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 8);

  return (
    <aside className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-colors">
      <div className="p-6">
        {/* Search Section */}
        <div className={`mb-6 ${isSearchOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search</h2>
            <button
              onClick={onSearchClose}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Tags Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {displayedTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </button>
            ))}
            {allTags.length > 8 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showAllTags ? 'Show less' : `+${allTags.length - 8} more`}
              </button>
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Posts ({posts.length})
          </h3>
          <div className="space-y-3">
            {posts.map(post => (
              <article
                key={post.id}
                onClick={() => onPostSelect(post)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedPost?.id === post.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {format(new Date(post.date), 'MMM dd')}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;