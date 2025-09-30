import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend.
    console.log({ name, email, subject, message });
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        {isSubmitted ? (
          <div className="mt-12 text-center bg-green-50 dark:bg-green-900 p-8 rounded-lg shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Thank you for your message!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
