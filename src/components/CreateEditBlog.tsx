import React, { useState } from 'react';
import { Bold, Italic, Underline, Heading2, Code, Quote, Link, Image, List, ListOrdered } from 'lucide-react';

const categories = ["JavaScript", "CSS", "AI", "Backend", "Frontend"];
const allTags = ["React", "TypeScript", "Node.js", "Python", "Data Science"];

const RichTextEditorToolbar: React.FC = () => (
    <div className="flex items-center space-x-1 p-2 bg-gray-100 dark:bg-gray-900 rounded-t-md border-b border-gray-300 dark:border-gray-600">
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Bold size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Italic size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Underline size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Heading2 size={16} /></button>
        <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Code size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Quote size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Link size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><Image size={16} /></button>
        <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><List size={16} /></button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><ListOrdered size={16} /></button>
    </div>
);

const CreateEditBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [content, setContent] = useState('');

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Create New Blog Post</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a catchy title"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                        <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 h-24 overflow-y-auto">
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => handleTagToggle(tag)}
                                        className={`px-3 py-1 text-sm rounded-full ${selectedTags.includes(tag)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                    <div className="rounded-md border border-gray-300 dark:border-gray-600">
                        <RichTextEditorToolbar />
                        <textarea 
                            id="content"
                            rows={15}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-4 border-t-0 rounded-b-md bg-white dark:bg-gray-700 focus:outline-none"
                            placeholder="Write your masterpiece..."
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        Save as Draft
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEditBlog;
