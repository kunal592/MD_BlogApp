# DevBlog - Premium Blog Application

A modern, feature-rich blog application built with React, TypeScript, and Tailwind CSS. Inspired by GitHub's design system, this application provides a professional platform for technical writing and documentation.

![DevBlog Screenshot](https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎨 Design & User Experience
- **GitHub-Inspired Design**: Clean, professional interface following GitHub's design principles
- **Dark/Light Theme**: Seamless theme switching with smooth transitions and localStorage persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle hover effects and micro-interactions throughout the interface

### 📝 Content Management
- **Full Markdown Support**: Complete markdown rendering with tables, links, images, and formatting
- **Syntax Highlighting**: Beautiful code blocks with language-specific syntax highlighting
- **Frontmatter Support**: Metadata extraction for titles, dates, tags, authors, and descriptions
- **Reading Time**: Automatic reading time calculation for each post

### 🔍 Search & Navigation
- **Real-time Search**: Instant filtering across post titles, content, and tags
- **Tag-based Filtering**: Dynamic tag system with visual indicators
- **Sidebar Navigation**: Organized post listing with metadata preview
- **Smart Filtering**: Combine search queries with tag filters for precise results

### 👤 Profile & Social
- **Author Profile**: Comprehensive profile page with stats, skills, and recent activity
- **Social Integration**: Direct links to GitHub, Twitter, LinkedIn, and email
- **Social Sharing**: Share posts on social media or copy links to clipboard
- **Activity Timeline**: Track recent posts and engagement

## 🛠️ Technology Stack

### Core Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full type coverage
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Tailwind Typography** - Beautiful typography styles for markdown content
- **Lucide React** - Consistent, modern icon library

### Markdown & Code
- **react-markdown** - Robust markdown parser and renderer
- **remark-gfm** - GitHub Flavored Markdown support (tables, strikethrough, etc.)
- **react-syntax-highlighter** - Syntax highlighting for code blocks
- **gray-matter** - Frontmatter parsing for post metadata

### Utilities
- **date-fns** - Modern date manipulation and formatting
- **Context API** - State management for theme and app state

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devblog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Main navigation and theme toggle
│   ├── Sidebar.tsx      # Search, filters, and post listing
│   ├── BlogPost.tsx     # Individual post rendering
│   └── Profile.tsx      # Author profile page
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management
├── data/               # Data and content
│   └── blogPosts.ts    # Sample posts and data structure
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Features Explained

### Theme System
- Automatic theme detection and persistence
- Smooth CSS transitions between themes
- Context-based theme management
- Dark mode optimized syntax highlighting

### Markdown Processing
- GitHub Flavored Markdown support
- Custom component rendering for tables, code blocks
- Syntax highlighting with theme-aware color schemes
- Responsive table handling with horizontal scroll

### Search & Filtering
- Real-time search across all post content
- Tag-based filtering with visual feedback
- Combined search and filter functionality
- Responsive search interface for mobile

### Content Management
- Frontmatter-based metadata system
- Automatic reading time calculation
- Tag extraction and management
- Date formatting and display

## 🎨 Design System

### Colors
- **Light Theme**: GitHub's light color palette with grays and blues
- **Dark Theme**: GitHub's dark theme with high contrast ratios
- **Accent Colors**: Blue (#3B82F6) primary, with success, warning, and error states

### Typography
- **Font Stack**: System fonts for optimal performance
- **Hierarchy**: Clear heading structure with consistent sizing
- **Reading Experience**: Optimized line height and spacing for long-form content

### Spacing
- **8px Grid System**: Consistent spacing throughout the interface
- **Responsive Breakpoints**: Mobile-first responsive design
- **Component Spacing**: Logical spacing between interface elements

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px - Collapsible sidebar, touch-optimized interactions
- **Tablet**: 768px - 1024px - Adjusted layout with proper spacing
- **Desktop**: > 1024px - Full layout with sidebar always visible

## 🔧 Customization

### Adding New Posts
1. Create markdown content with frontmatter in `src/data/blogPosts.ts`
2. Follow the existing post structure with required metadata
3. Posts automatically appear in the sidebar and search

### Customizing Themes
- Modify theme colors in `tailwind.config.js`
- Update syntax highlighting themes in `BlogPost.tsx`
- Adjust component styles using Tailwind classes

### Profile Information
- Update profile data in `src/components/Profile.tsx`
- Modify social links and contact information
- Customize skills, stats, and activity timeline

## 🚀 Performance Features

- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Images**: Responsive images with proper loading
- **Efficient Rendering**: React optimizations for smooth scrolling
- **Fast Search**: Efficient filtering algorithms for real-time search

## 🔍 SEO & Accessibility

- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Meta Tags**: Comprehensive meta tags for social sharing
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: ARIA labels and proper markup
- **Color Contrast**: WCAG compliant contrast ratios in both themes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📧 Contact

For questions or support, reach out through:
- GitHub Issues
- Email: contact@devblog.example
- Twitter: @devblog

---

Built with ❤️ using React, TypeScript, and Tailwind CSS