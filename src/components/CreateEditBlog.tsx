import React, { useState } from 'react';

const CreateEditBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Create/Edit Blog</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
          <input 
            type="text" 
            id="tags" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <textarea 
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
            placeholder="Write your blog content here... (Markdown is supported)"
          />
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Blog Post
        </button>
      </div>
    </div>
  );
};

export default CreateEditBlog;
