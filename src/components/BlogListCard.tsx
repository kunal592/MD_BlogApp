import React from 'react';
import { BlogPost } from '../data/blogPosts';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';

interface BlogListCardProps {
  post: BlogPost;
  onPostSelect: (post: BlogPost) => void;
}

const BlogListCard: React.FC<BlogListCardProps> = ({ post, onPostSelect }) => {
  const excerpt = post.content.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full mb-6" 
      onClick={() => onPostSelect(post)}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-64" src={post.imageUrl} alt={post.title} />
        </div>
        <div className="p-8 flex-grow">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">{post.tags.join(', ')}</div>
          <h2 className="block mt-1 text-2xl leading-tight font-bold text-black dark:text-white">{post.title}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{excerpt}</p>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full mr-3"/>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p>{format(new Date(post.date), 'MMMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center text-blue-500 dark:text-blue-400">
              <span>Read more</span>
              <ArrowUpRight size={20} className="ml-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListCard;
