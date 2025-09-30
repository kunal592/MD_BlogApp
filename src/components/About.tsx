import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  { name: 'John Doe', role: 'Founder & CEO', avatar: '/avatars/john-doe.png', bio: 'John is a passionate developer with a love for building amazing products.', social: { github: '#', linkedin: '#', twitter: '#' } },
  { name: 'Jane Smith', role: 'Lead Designer', avatar: '/avatars/jane-smith.png', bio: 'Jane has a keen eye for design and creates beautiful, user-friendly interfaces.', social: { github: '#', linkedin: '#', twitter: '#' } },
  { name: 'Sam Wilson', role: 'Head of Content', avatar: '/avatars/sam-wilson.png', bio: 'Sam is a master storyteller, crafting compelling content for our users.', social: { github: '#', linkedin: '#', twitter: '#' } },
];

const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'];

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Introduction */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">About MD-Blog</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Your one-stop destination for the latest in tech, design, and development.</p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-md text-blue-500 dark:text-blue-400 font-semibold">{member.role}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.social.github} className="text-gray-400 hover:text-gray-500"><Github /></a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-gray-500"><Linkedin /></a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-gray-500"><Twitter /></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Our Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map(tech => (
              <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tech}</span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Join Our Community</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Ready to dive in? Create an account today and start your journey with us.</p>
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
