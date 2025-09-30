import React, { useState } from 'react';
import { blogPosts, BlogPost as BlogPostType } from '../data/blogPosts';
import { useLayout, LayoutType } from '../contexts/LayoutContext';
import BlogListCard from './BlogListCard';
import BlogPostCard from './BlogPostCard';
import { ArrowRight, Calendar, Clock, Tag, LayoutGrid, List } from 'lucide-react';
import { format } from 'date-fns';
import Trending from './Trending';

const categories = ["All", "JavaScript", "CSS", "AI", "Backend", "Frontend"];

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


const Home: React.FC<{ onPostSelect: (post: BlogPostType) => void; }> = ({ onPostSelect }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const { layout } = useLayout();

    const filteredPosts = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory || post.tags.includes(activeCategory));

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                                        activeCategory === cat
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="hidden sm:flex">
                           <LayoutToggle />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <section>
                             {layout === 'grid' ? (
                                <div className="grid gap-8 sm:grid-cols-2">
                                    {filteredPosts.map(post => (
                                        <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {filteredPosts.map(post => (
                                        <BlogListCard key={post.id} post={post} onPostSelect={onPostSelect} />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-36">
                            <Trending />
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Home;
