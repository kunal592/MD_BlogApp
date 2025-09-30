import React from 'react';
import { BlogPost } from '../data/blogPosts';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

const BlogPostCard: React.FC<{ post: BlogPost; onPostSelect: (post: BlogPost) => void; }> = ({ post, onPostSelect }) => (
    <div onClick={() => onPostSelect(post)} className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {format(new Date(post.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {post.readingTime} min read
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <Tag size={12} className="mr-1" />
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default BlogPostCard;
