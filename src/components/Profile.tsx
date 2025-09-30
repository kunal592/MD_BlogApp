import React from 'react';
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, Code, Coffee } from 'lucide-react';

const Profile: React.FC = () => {
  const stats = [
    { label: 'Posts', value: '42' },
    { label: 'Views', value: '12.3k' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '234' },
  ];

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS',
    'Docker', 'GraphQL', 'Next.js', 'Tailwind CSS', 'Redux', 'Express'
  ];

  const recentActivity = [
    { action: 'Published', item: 'Getting Started with React and TypeScript', date: '2 days ago' },
    { action: 'Updated', item: 'Mastering CSS Grid Layout', date: '1 week ago' },
    { action: 'Commented on', item: 'Modern JavaScript Features', date: '2 weeks ago' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              AJ
            </div>
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Alex Johnson
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Full-Stack Developer & Technical Writer
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Passionate about building scalable web applications and sharing knowledge through technical writing. 
              I love exploring new technologies and helping developers grow their skills through practical tutorials and insights.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="flex items-center">
                <MapPin size={16} className="mr-1" />
                San Francisco, CA
              </span>
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Joined January 2020
              </span>
              <span className="flex items-center">
                <Code size={16} className="mr-1" />
                5+ years experience
              </span>
              <span className="flex items-center">
                <Coffee size={16} className="mr-1" />
                Coffee enthusiast
              </span>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                <Github size={16} className="mr-2" />
                GitHub
              </a>
              <a
                href="https://twitter.com/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Twitter size={16} className="mr-2" />
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={16} className="mr-2" />
                LinkedIn
              </a>
              <a
                href="mailto:alex@example.com"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-blue-600 dark:text-blue-400">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;