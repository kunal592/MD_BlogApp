import React from 'react';
import { Eye, Heart, Bookmark, MessageSquare } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Dashboard: React.FC = () => {
  const recentBlogs = blogPosts.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      
      {/* Stats */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stats</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <Eye className="text-blue-500 w-8 h-8 mr-4" />
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">12.3k</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Views</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <Heart className="text-red-500 w-8 h-8 mr-4" />
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">1.2k</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Likes</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <Bookmark className="text-green-500 w-8 h-8 mr-4" />
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">432</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Bookmarks</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <MessageSquare className="text-yellow-500 w-8 h-8 mr-4" />
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">128</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Comments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Blogs</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {recentBlogs.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {/* Placeholder for recent activity */}
          <p className="text-gray-500 dark:text-gray-400">No recent activity.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
