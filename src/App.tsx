import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlogPost from './components/BlogPost';
import Profile from './components/Profile';
import { blogPosts, BlogPost as BlogPostType } from './data/blogPosts';

function AppContent() {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(blogPosts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePostSelect = (post: BlogPostType) => {
    setSelectedPost(post);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        onSearchToggle={handleSearchToggle}
        onProfileToggle={handleProfileToggle}
        isProfileOpen={isProfileOpen}
      />
      
      <div className="flex">
        <div className={`${isSearchOpen ? 'block' : 'hidden lg:block'} fixed lg:static inset-y-0 left-0 z-40 lg:z-auto`}>
          <Sidebar
            posts={filteredPosts}
            selectedPost={selectedPost}
            onPostSelect={handlePostSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            isSearchOpen={isSearchOpen}
            onSearchClose={handleSearchClose}
          />
        </div>
        
        <main className="flex-1 overflow-y-auto">
          {isProfileOpen ? (
            <Profile />
          ) : selectedPost ? (
            <BlogPost post={selectedPost} />
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleSearchClose}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;