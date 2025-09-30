import React from 'react';
import { blogPosts, BlogPost as BlogPostType } from '../data/blogPosts';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

const FeaturedBlogPostCard: React.FC<{ post: BlogPostType }> = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden">
    <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {post.readingTime} min read
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 1).map(tag => (
            <span key={tag} className="inline-block px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.description}
      </p>
      <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center">
        Read More <ArrowRight size={16} className="ml-1" />
      </a>
    </div>
  </div>
);

const BlogPostCard: React.FC<{ post: BlogPostType }> = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
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
      <div className="flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const featuredPosts = blogPosts.slice(0, 3);
  const allPosts = blogPosts;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Blogs */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b-2 border-blue-500 pb-2 inline-block">Featured Blogs</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {featuredPosts.map(post => (
              <FeaturedBlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* All Blogs */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b-2 border-gray-300 dark:border-gray-600 pb-2">All Blogs</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
