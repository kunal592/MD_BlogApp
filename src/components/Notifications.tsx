import React from 'react';
import { Bell, MessageSquare, UserPlus } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'comment',
    message: 'Jane Doe commented on your post "The Future of React".',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'follow',
    message: 'Sam Wilson started following you.',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'comment',
    message: 'Alex Johnson replied to your comment on "Understanding Hooks".',
    time: '3 days ago',
    read: true,
  },
    {
    id: 4,
    type: 'follow',
    message: 'Emily White started following you.',
    time: '5 days ago',
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'comment':
      return <MessageSquare className="w-6 h-6 text-blue-500" />;
    case 'follow':
      return <UserPlus className="w-6 h-6 text-green-500" />;
    default:
      return <Bell className="w-6 h-6 text-gray-500" />;
  }
};

const Notifications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Notifications</h1>
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Mark all as read
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map(notification => (
            <li 
              key={notification.id} 
              className={`p-4 flex items-start space-x-4 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="flex-shrink-0">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
              </div>
               {!notification.read && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
