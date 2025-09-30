import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  content: string;
  readingTime: number;
  slug: string;
  imageUrl: string;
  status: 'published' | 'draft';
  category: string;
  likes: number;
  bookmarks: number;
  views: number;
}

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
};

const samplePosts = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/react/800/600',
    markdown: `---
title: "Getting Started with React and TypeScript"
date: "2024-01-15"
author: "Alex Johnson"
tags: ["React", "TypeScript", "Frontend"]
description: "Learn how to set up a modern React project with TypeScript and best practices for type-safe development."
status: "published"
category: "Frontend"
likes: 152
bookmarks: 45
views: 2500
---

# Getting Started with React and TypeScript

TypeScript has become the de facto standard for building scalable React applications. In this comprehensive guide, we'll explore how to set up and configure a React project with TypeScript.

... (content unchanged)
`
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/css/800/600',
    markdown: `---
title: "Mastering CSS Grid Layout"
date: "2024-01-10"
author: "Alex Johnson"
tags: ["CSS", "Grid", "Layout", "Frontend"]
description: "Deep dive into CSS Grid Layout with practical examples and real-world use cases."
status: "published"
category: "CSS"
likes: 210
bookmarks: 78
views: 3200
---

# Mastering CSS Grid Layout

... (content unchanged)
`
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/js/800/600',
    markdown: `---
title: "Modern JavaScript Features You Should Know"
date: "2024-01-05"
author: "Alex Johnson"
tags: ["JavaScript", "ES6", "Modern", "Development"]
description: "Explore the latest JavaScript features that will make your code more elegant and efficient."
status: "draft"
category: "JavaScript"
likes: 98
bookmarks: 22
views: 1800
---

# Modern JavaScript Features You Should Know

... (content unchanged)
`
  }
];

export const blogPosts: BlogPost[] = samplePosts.map(post => {
  const parsed = matter(post.markdown);
  const readingTime = calculateReadingTime(parsed.content);
  
  return {
    id: post.id,
    title: parsed.data.title,
    date: parsed.data.date,
    author: parsed.data.author,
    tags: parsed.data.tags,
    description: parsed.data.description,
    content: parsed.content,
    readingTime,
    slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    imageUrl: post.imageUrl,
    status: parsed.data.status || 'draft',
    category: parsed.data.category || 'Uncategorized',
    likes: parsed.data.likes || 0,
    bookmarks: parsed.data.bookmarks || 0,
    views: parsed.data.views || 0,
  };
});
