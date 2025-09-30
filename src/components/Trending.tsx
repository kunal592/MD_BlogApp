import React from 'react';
import { BlogPost } from '../data/blogPosts';
import { Flame } from 'lucide-react';

// Dummy Data
const trendingPosts: Partial<BlogPost>[] = [
  { slug: '1', title: 'Mastering CSS Grid Layout', author: 'Alex Johnson' },
  { slug: '2', title: 'Modern JavaScript Features You Should Know', author: 'Alex Johnson' },
  { slug: '3', title: 'Getting Started with React and TypeScript', author: 'Alex Johnson' },
];

const trendingTags = ['React', 'JavaScript', 'CSS', 'Frontend', 'Development'];

const Trending: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Flame size={20} className="mr-3 text-red-500"/>
        Trending Now
      </h2>
      
      {/* Trending Blogs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Top Blogs</h3>
        <div className="space-y-3">
          {trendingPosts.map((post, index) => (
            <div key={post.slug} className="flex items-start">
              <span className="text-lg font-bold text-gray-400 dark:text-gray-500 mr-3">{index + 1}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer">{post.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {post.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map(tag => (
            <button key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
