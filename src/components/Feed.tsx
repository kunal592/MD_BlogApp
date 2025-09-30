import React from 'react';
import { blogPosts as allPosts, BlogPost } from '../data/blogPosts';
import { useLayout } from '../contexts/LayoutContext';
import BlogListCard from './BlogListCard';
import BlogPostCard from './BlogPostCard';
import { Rss, UserPlus, LayoutGrid, List } from 'lucide-react';

// Dummy Data - now using some posts from the main data
const followedAuthorsPosts: BlogPost[] = allPosts.slice(0, 4); 

const suggestedAuthors = [
  { id: 1, name: 'Olivia Davis', bio: 'Frontend Developer specializing in React and Next.js', avatar: '/avatars/avatar-4.png' },
  { id: 2, name: 'Ethan Harris', bio: 'Full-Stack Engineer with a passion for serverless architectures', avatar: '/avatars/avatar-5.png' },
  { id: 3, name: 'Sophia Turner', bio: 'UX/UI Designer focused on creating intuitive user experiences', avatar: '/avatars/avatar-6.png' },
];

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

const Feed: React.FC<{ onPostSelect: (post: BlogPost) => void; }> = ({ onPostSelect }) => {
  const { layout } = useLayout();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <Rss size={28} className="mr-4 text-orange-500"/>
          Your Feed
        </h1>
        <LayoutToggle />
      </div>

      {followedAuthorsPosts.length > 0 ? (
        layout === 'grid' ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {followedAuthorsPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
                ))}
            </div>
        ) : (
            <div className="space-y-6">
                {followedAuthorsPosts.map(post => (
                    <BlogListCard key={post.id} post={post} onPostSelect={onPostSelect} />
                ))}
            </div>
        )
      ) : (
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Feed is Quiet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Follow authors to see their latest posts here.</p>
          
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Suggested Authors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedAuthors.map(author => (
                <div key={author.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex flex-col items-center shadow-sm">
                  <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full mb-4"/>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{author.name}</h4>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400 my-2">{author.bio}</p>
                  <button className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <UserPlus size={16} className="mr-2"/>
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
