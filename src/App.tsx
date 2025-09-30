import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LayoutProvider } from './contexts/LayoutContext'; // Import LayoutProvider
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import BlogDetail from './components/BlogDetail';
import MyBlogs from './components/MyBlogs';
import CreateEditBlog from './components/CreateEditBlog';
import Feed from './components/Feed';
import About from './components/About';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard';
import ReportedContent from './components/admin/ReportedContent';
import AdminLayout from './components/admin/AdminLayout';
import { blogPosts, BlogPost as BlogPostType } from './data/blogPosts';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedPost(null);
  };
  
  const handlePostSelect = (post: BlogPostType) => {
    setSelectedPost(post);
    setCurrentPage('blog-detail');
  };

  const handleBack = () => {
    setSelectedPost(null);
    setCurrentPage('home');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderAdminContent = () => {
    let content;
    switch (currentPage) {
      case 'admin-analytics':
        content = <AnalyticsDashboard />;
        break;
      case 'admin-reported-content':
        content = <ReportedContent />;
        break;
      default:
        content = <AnalyticsDashboard />;
    }
    return <AdminLayout onNavigate={handleNavigate}>{content}</AdminLayout>;
  };

  if (currentPage.startsWith('admin')) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex-grow">
          {renderAdminContent()}
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    if (selectedPost) {
      return <BlogDetail post={selectedPost} onBack={handleBack} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onPostSelect={handlePostSelect} />;
      case 'my-blogs':
        return <MyBlogs />;
      case 'create-edit-blog':
        return <CreateEditBlog />;
      case 'feed':
        return <Feed />;
      case 'about':
        return <About />;
      default:
        return <Home onPostSelect={handlePostSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow pt-16">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <AppContent />
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
