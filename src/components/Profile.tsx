import React, { useState } from 'react';
import { AtSign, Book, Calendar, Edit, Heart, Save, UserPlus, Users, X } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const mockFollowers = [
  { id: 1, name: 'Jane Doe', avatar: '/avatars/jane-doe.png', following: true },
  { id: 2, name: 'Sam Wilson', avatar: '/avatars/sam-wilson.png', following: false },
  { id: 3, name: 'Alex Johnson', avatar: '/avatars/alex-johnson.png', following: true },
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('/avatars/profile-pic.png');
  const [bio, setBio] = useState('Loves to write about tech and design.');
  const [followers, setFollowers] = useState(mockFollowers);

  const handleFollowToggle = (id: number) => {
    setFollowers(followers.map(f => f.id === id ? { ...f, following: !f.following } : f));
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'blogs':
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{post.date}</p>
              </div>
            </div>
          ))}
        </div>;
      case 'likes':
        return <p>Liked posts will be shown here.</p>;
      case 'bookmarks':
        return <p>Bookmarked posts will be shown here.</p>;
      case 'followers':
        return <div className="space-y-4">
          {followers.map(follower => (
            <div key={follower.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <img src={follower.avatar} alt={follower.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">{follower.name}</h4>
                </div>
              </div>
              <button 
                onClick={() => handleFollowToggle(follower.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center ${follower.following ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                <UserPlus size={16} className="mr-2"/>
                {follower.following ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="md:flex md:items-center">
            <div className="md:flex-shrink-0 relative">
              <img className="h-24 w-24 rounded-full object-cover" src={avatar} alt="User profile" />
              {isEditing && (
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600">
                  <Edit size={14} />
                  <input id="avatar-upload" type="file" className="hidden" onChange={(e) => e.target.files && setAvatar(URL.createObjectURL(e.target.files[0]))} />
                </label>
              )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">John Doe</h2>
              {isEditing ? (
                <textarea value={bio} onChange={e => setBio(e.target.value)} className="mt-1 text-md text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded-md w-full" rows={2}></textarea>
              ) : (
                <p className="mt-1 text-md text-gray-600 dark:text-gray-400">{bio}</p>
              )}
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <AtSign size={16} className="mr-2"/> johndoe@example.com
                <Calendar size={16} className="ml-4 mr-2"/> Joined January 2023
              </div>
            </div>
            <div className="ml-auto mt-4 md:mt-0">
              <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                {isEditing ? <X size={16} className="mr-2"/> : <Edit size={16} className="mr-2"/>}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {isEditing && <button onClick={() => setIsEditing(false)} className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"><Save size={16} className="mr-2"/>Save</button>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('blogs')} className={`${activeTab === 'blogs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}><Book size={16} className="mr-2"/>Blogs</button>
            <button onClick={() => setActiveTab('likes')} className={`${activeTab === 'likes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}><Heart size={16} className="mr-2"/>Likes</button>
            <button onClick={() => setActiveTab('bookmarks')} className={`${activeTab === 'bookmarks' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}><AtSign size={16} className="mr-2"/>Bookmarks</button>
            <button onClick={() => setActiveTab('followers')} className={`${activeTab === 'followers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}><Users size={16} className="mr-2"/>Followers</button>
          </nav>
        </div>

        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
