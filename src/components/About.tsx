import React from 'react';
import { Building, Users, Code, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">About DevDocks</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Your one-stop destination for high-quality developer blogs and insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col items-start">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
              <Target size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">To create a vibrant community where developers can share their knowledge, learn from each other, and grow their skills. We believe in the power of open-source and collaborative learning.</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
              <Code size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">What We Do</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">DevDocks provides a platform for developers to publish articles, tutorials, and case studies on a wide range of topics, including web development, AI, machine learning, and more.</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <img src="/avatars/avatar-1.png" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Alex Johnson</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
            <div className="text-center">
              <img src="/avatars/avatar-2.png" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Samantha Ming</h3>
              <p className="text-gray-500">Lead Editor</p>
            </div>
            <div className="text-center">
              <img src="/avatars/avatar-3.png" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-2" />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-500">Community Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
