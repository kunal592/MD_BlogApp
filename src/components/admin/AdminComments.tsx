import React from 'react';
import { Trash2 } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

const AdminComments: React.FC = () => {
  const comments = [
    { id: 1, blogId: blogPosts[0].id, blogTitle: blogPosts[0].title, author: 'Jane Doe', content: 'Great article! Very insightful.' },
    { id: 2, blogId: blogPosts[1].id, blogTitle: blogPosts[1].title, author: 'John Smith', content: 'Thanks for sharing. I learned a lot.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Manage Comments</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comment</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Blog Post</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map(comment => (
              <tr key={comment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{comment.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{comment.blogTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{comment.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComments;
