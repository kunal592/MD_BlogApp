import React from 'react';
import { Users, FileText, Heart, Bookmark, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-500' },
    { name: 'Total Blogs', value: '567', icon: FileText, color: 'text-green-500' },
    { name: 'Total Likes', value: '12.8k', icon: Heart, color: 'text-red-500' },
    { name: 'Total Bookmarks', value: '5.4k', icon: Bookmark, color: 'text-yellow-500' },
    { name: 'Total Comments', value: '2,345', icon: MessageSquare, color: 'text-indigo-500' },
  ];

  const userGrowthData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 500 },
    { name: 'Apr', users: 700 },
    { name: 'May', users: 600 },
    { name: 'Jun', users: 800 },
  ];

  const blogsPublishedData = [
    { name: 'Jan', blogs: 20 },
    { name: 'Feb', blogs: 35 },
    { name: 'Mar', blogs: 40 },
    { name: 'Apr', blogs: 55 },
    { name: 'May', blogs: 60 },
    { name: 'Jun', blogs: 70 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {stats.map(stat => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
            <stat.icon className={`w-10 h-10 mr-4 ${stat.color}`} />
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Blogs Published</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={blogsPublishedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="blogs" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
