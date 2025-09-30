import React, { useState } from 'react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { useLayout } from '../contexts/LayoutContext';
import BlogListCard from './BlogListCard';
import BlogPostCard from './BlogPostCard';
import { Edit, Trash2, CheckCircle, FileText, LayoutGrid, List } from 'lucide-react';

// Dummy data for drafts and published blogs
const myPublishedBlogs = blogPosts.slice(0, 2);
const myDraftBlogs = blogPosts.slice(2, 3);

const LayoutToggle: React.FC = () => {
    const { layout, setLayout } = useLayout();

    return (
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => setLayout('grid')} 
                className={`p-2 rounded-md transition-colors ${layout === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                <LayoutGrid size={20}/>
            </button>
            <button 
                onClick={() => setLayout('list')} 
                className={`p-2 rounded-md transition-colors ${layout === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                <List size={20}/>
            </button>
        </div>
    );
};

const MyBlogs: React.FC<{ onPostSelect: (post: BlogPost) => void; }> = ({ onPostSelect }) => {
  const [activeTab, setActiveTab] = useState('published');
  const { layout } = useLayout();

  const renderBlogList = (blogs: BlogPost[], isDraft: boolean) => (
    layout === 'grid' ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(post => (
                <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
            ))}
        </div>
    ) : (
        <div className="space-y-6">
            {blogs.map(post => (
                <BlogListCard key={post.id} post={post} onPostSelect={onPostSelect} />
            ))}
        </div>
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Blogs</h1>
        <div className="flex items-center space-x-4">
            <LayoutToggle />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create New Blog
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('published')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'published'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'drafts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {activeTab === 'published' ? renderBlogList(myPublishedBlogs, false) : renderBlogList(myDraftBlogs, true)}
    </div>
  );
};

export default MyBlogs;
