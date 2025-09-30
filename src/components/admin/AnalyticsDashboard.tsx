import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.2)',
      },
    },
  },
};

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Views',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
        label: 'Likes',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
    },
  ],
};

const barChartData = {
    labels: ['JavaScript', 'React', 'CSS', 'AI', 'Node.js', 'Python'],
    datasets: [
      {
        label: 'Blogs per Tag',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(20, 184, 166, 0.7)',
      },
    ],
  };
  

const topAuthors = [
    { name: 'Alex Johnson', views: 15000, likes: 7500, avatar: '/avatars/avatar-1.png' },
    { name: 'Samantha Ming', views: 12000, likes: 6000, avatar: '/avatars/avatar-2.png' },
    { name: 'John Doe', views: 9000, likes: 4500, avatar: '/avatars/avatar-3.png' },
];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Analytics Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96">
                <h3 className="font-semibold mb-4">Content Performance</h3>
                <Line options={chartOptions} data={lineChartData} />
            </div>

            {/* Top Authors */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4">Top Authors</h3>
                <div className="space-y-4">
                    {topAuthors.map(author => (
                        <div key={author.name} className="flex items-center space-x-4">
                            <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">{author.name}</p>
                                <p className="text-sm text-gray-500">{author.views.toLocaleString()} views &bull; {author.likes.toLocaleString()} likes</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Tags/Categories */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96">
                <h3 className="font-semibold mb-4">Top Tags & Categories</h3>
                <Bar options={chartOptions} data={barChartData} />
            </div>
        </div>
    </div>
  );
};

export default AnalyticsDashboard;
