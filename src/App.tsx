import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BlogDetail from './components/BlogDetail';
import MyBlogs from './components/MyBlogs';
import CreateEditBlog from './components/CreateEditBlog';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminBlogs from './components/admin/AdminBlogs';
import AdminComments from './components/admin/AdminComments';
import AdminQueries from './components/admin/AdminQueries';
import About from './components/About';
import Contact from './components/Contact';
import Notifications from './components/Notifications';
import { blogPosts, BlogPost as BlogPostType } from './data/blogPosts';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(blogPosts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsNavOpen(false);
  };
  
  const handlePostSelect = (post: BlogPostType) => {
    setSelectedPost(post);
    setCurrentPage('blog-detail');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderAdminContent = () => {
    let content;
    switch (currentPage) {
      case 'admin-users':
        content = <AdminUsers />;
        break;
      case 'admin-blogs':
        content = <AdminBlogs />;
        break;
      case 'admin-comments':
        content = <AdminComments />;
        break;
      case 'admin-queries':
        content = <AdminQueries />;
        break;
      default:
        content = <AdminDashboard />;
    }
    return <AdminLayout onNavigate={handleNavigate}>{content}</AdminLayout>;
  };

  if (currentPage.startsWith('admin')) {
    return renderAdminContent();
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPostSelect={handlePostSelect} />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
        return <Dashboard />;
      case 'my-blogs':
        return <MyBlogs />;
      case 'create-edit-blog':
        return <CreateEditBlog />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'notifications':
        return <Notifications />;
      case 'blog-detail':
        return selectedPost ? <BlogDetail post={selectedPost} /> : <Home onPostSelect={handlePostSelect} />;
      case 'blogs':
      default:
        return (
          <div className="flex">
            <div className={`${isSearchOpen ? 'block' : 'hidden lg:block'} fixed lg:static inset-y-0 left-0 z-40 lg:z-auto`}>
              <Sidebar
                posts={blogPosts}
                selectedPost={selectedPost}
                onPostSelect={handlePostSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTags={selectedTags}
                onTagToggle={() => {}}
                isSearchOpen={isSearchOpen}
                onSearchClose={() => setIsSearchOpen(false)}
              />
            </div>
            <main className="flex-1 overflow-y-auto">
              {selectedPost ? (
                <BlogDetail post={selectedPost} />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      No posts found
                    </h2>
                  </div>
                </div>
              )}
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
        onProfileToggle={() => handleNavigate('profile')}
        isProfileOpen={currentPage === 'profile'}
        onNavToggle={() => setIsNavOpen(!isNavOpen)}
        isNavOpen={isNavOpen}
        onNavigate={handleNavigate}
      />
      {renderContent()}
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
