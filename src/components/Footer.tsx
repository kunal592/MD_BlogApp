import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">DevDocks</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              DevDocks is a modern, open-source blogging platform designed for developers. Share your knowledge, connect with the community, and grow your personal brand.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Feed</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">My Blogs</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} DevDocks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
