import React from 'react';
import { ShieldAlert, Trash2, Eye } from 'lucide-react';

// Dummy Data
const reportedItems = [
  {
    id: 1, type: 'Blog', content: 'This is a spammy blog post trying to sell a product.', 
    author: 'SpamBot9000', reason: 'Spam', date: '2024-07-28'
  },
  {
    id: 2, type: 'Comment', content: 'This comment is offensive and uses hate speech.', 
    author: 'TrollMaster', reason: 'Offensive', date: '2024-07-27' 
  },
  {
    id: 3, type: 'Blog', content: 'The code in this post is incorrect and misleading.', 
    author: 'DevGal', reason: 'Other', date: '2024-07-26'
  },
];

const ReportedContent: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <ShieldAlert size={28} className="mr-4 text-red-500"/>
            Reported Content
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Content</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reportedItems.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'Blog' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {item.type}
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4 truncate max-w-sm">{item.content}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">{item.reason}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                <button className="text-indigo-600 hover:text-indigo-900"><Eye size={18}/></button>
                                <button className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ReportedContent;
