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
}

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
};

// Sample markdown posts with frontmatter
const samplePosts = [
  {
    id: '1',
    markdown: `---
title: "Getting Started with React and TypeScript"
date: "2024-01-15"
author: "Alex Johnson"
tags: ["React", "TypeScript", "Frontend"]
description: "Learn how to set up a modern React project with TypeScript and best practices for type-safe development."
---

# Getting Started with React and TypeScript

TypeScript has become the de facto standard for building scalable React applications. In this comprehensive guide, we'll explore how to set up and configure a React project with TypeScript.

## Why TypeScript with React?

TypeScript brings several advantages to React development:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confident code changes with type checking

## Setting Up the Project

First, create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Component Types

Here's how to type a simple React component:

\`\`\`typescript
interface Props {
  title: string;
  count: number;
  onIncrement: () => void;
}

const Counter: React.FC<Props> = ({ title, count, onIncrement }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};
\`\`\`

## Best Practices

1. **Use Interface over Type**: Prefer \`interface\` for object shapes
2. **Generic Components**: Leverage generics for reusable components
3. **Strict Mode**: Enable strict TypeScript settings
4. **Consistent Naming**: Use PascalCase for interfaces and types

This foundation will set you up for success with TypeScript and React!`
  },
  {
    id: '2',
    markdown: `---
title: "Mastering CSS Grid Layout"
date: "2024-01-10"
author: "Alex Johnson"
tags: ["CSS", "Grid", "Layout", "Frontend"]
description: "Deep dive into CSS Grid Layout with practical examples and real-world use cases."
---

# Mastering CSS Grid Layout

CSS Grid is a powerful two-dimensional layout system that has revolutionized how we approach web layouts. Let's explore its capabilities with practical examples.

## Grid Fundamentals

CSS Grid introduces several new concepts:

| Property | Description |
|----------|-------------|
| \`display: grid\` | Creates a grid container |
| \`grid-template-columns\` | Defines column tracks |
| \`grid-template-rows\` | Defines row tracks |
| \`gap\` | Sets spacing between tracks |

## Basic Grid Example

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-column: 1 / -1; }
.sidebar { grid-column: 1; }
.main { grid-column: 2; }
.aside { grid-column: 3; }
.footer { grid-column: 1 / -1; }
\`\`\`

## Advanced Patterns

### Named Grid Lines

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 
    [sidebar-start] 250px 
    [sidebar-end main-start] 1fr 
    [main-end];
}
\`\`\`

### Grid Areas

\`\`\`css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
\`\`\`

## Responsive Grids

Grid makes responsive design intuitive:

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

Grid Layout opens up endless possibilities for creative and functional web layouts!`
  },
  {
    id: '3',
    markdown: `---
title: "Modern JavaScript Features You Should Know"
date: "2024-01-05"
author: "Alex Johnson"
tags: ["JavaScript", "ES6", "Modern", "Development"]
description: "Explore the latest JavaScript features that will make your code more elegant and efficient."
---

# Modern JavaScript Features You Should Know

JavaScript continues to evolve rapidly. Let's explore some modern features that can make your code more elegant and efficient.

## Optional Chaining (?.)

Safely access nested object properties:

\`\`\`javascript
// Old way
const city = user && user.address && user.address.city;

// Modern way
const city = user?.address?.city;

// With arrays
const firstItem = items?.[0]?.name;

// With methods
const result = api?.getData?.();
\`\`\`

## Nullish Coalescing (??)

Provide defaults only for null/undefined:

\`\`\`javascript
// Different from ||
const value = someValue ?? 'default';

// Works with 0, false, empty string
const count = 0;
const displayCount = count ?? 'N/A'; // Shows 0
const displayCount2 = count || 'N/A'; // Shows 'N/A'
\`\`\`

## Template Literals

Create complex strings easily:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Multiline strings
const html = \`
  <div class="card">
    <h2>\${title}</h2>
    <p>\${description}</p>
  </div>
\`;

// Tagged templates
const styled = css\`
  color: \${props => props.primary ? 'blue' : 'black'};
\`;
\`\`\`

## Destructuring Assignment

Extract values elegantly:

\`\`\`javascript
// Object destructuring
const { name, email, age = 18 } = user;

// Array destructuring
const [first, second, ...rest] = items;

// Parameter destructuring
function createUser({ name, email, role = 'user' }) {
  return { name, email, role, id: generateId() };
}
\`\`\`

## Array Methods

Powerful functional programming tools:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Transform data
const doubled = numbers.map(n => n * 2);

// Filter data
const evens = numbers.filter(n => n % 2 === 0);

// Reduce data
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Find items
const found = numbers.find(n => n > 3);
const hasLarge = numbers.some(n => n > 10);
\`\`\`

These features make JavaScript more expressive and help you write cleaner, more maintainable code!`
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
    slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
});