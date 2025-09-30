import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { Edit, Trash2 } from 'lucide-react';

const MyBlogs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Blogs</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create New Blog
        </button>
      </div>

      <div className="grid gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">Last updated on {post.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                <Edit size={20} />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                <Trash2 size={20} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
