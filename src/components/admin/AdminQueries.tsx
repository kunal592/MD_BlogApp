import React, { useState } from 'react';
import { CheckCircle, Mail, Send } from 'lucide-react';

const mockQueries = [
  { id: 1, name: 'Alice', email: 'alice@example.com', subject: 'Question about billing', message: 'I have a question about my recent invoice.', status: 'Pending' },
  { id: 2, name: 'Bob', email: 'bob@example.com', subject: 'Feature request', message: 'It would be great if you could add a dark mode to the app.', status: 'Pending' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', subject: 'Bug report', message: 'I found a bug on the profile page.', status: 'Resolved' },
];

const AdminQueries: React.FC = () => {
  const [queries, setQueries] = useState(mockQueries);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const handleReplyClick = (query: any) => {
    setSelectedQuery(query);
    setIsReplyModalOpen(true);
  };

  const handleSendReply = () => {
    if (!selectedQuery) return;
    console.log(`Replying to ${selectedQuery.email}: ${replyMessage}`);
    const updatedQueries = queries.map(q => 
      q.id === selectedQuery.id ? { ...q, status: 'Resolved' } : q
    );
    setQueries(updatedQueries);
    setIsReplyModalOpen(false);
    setReplyMessage('');
  };

  const handleMarkAsResolved = (id: number) => {
    const updatedQueries = queries.map(q => 
      q.id === id ? { ...q, status: 'Resolved' } : q
    );
    setQueries(updatedQueries);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Manage Queries</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {queries.map(query => (
              <tr key={query.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{query.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{query.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{query.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${query.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {query.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    <button 
                      onClick={() => handleReplyClick(query)}
                      className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <Mail size={16} className="mr-1" />
                      Reply
                    </button>
                    {query.status !== 'Resolved' && (
                      <button 
                        onClick={() => handleMarkAsResolved(query.id)}
                        className="flex items-center text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isReplyModalOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reply to {selectedQuery.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Subject:</strong> {selectedQuery.subject}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4"><strong>Message:</strong> {selectedQuery.message}</p>
            <textarea 
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 mb-4"
              rows={5}
              placeholder="Write your reply..."
            />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsReplyModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleSendReply} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Send size={16} className="mr-2" />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQueries;
