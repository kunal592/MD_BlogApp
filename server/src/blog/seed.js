/**
 * 🌱 Prisma Seed Script (Updated)
 * Only seeds sample Blogs (users must already exist in DB via Google OAuth)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Get existing users
  const users = await prisma.user.findMany({ take: 3 });
  if (users.length < 1) {
    throw new Error("❌ No users found. Please create at least 1 user via Google OAuth before seeding blogs.");
  }

  console.log(`✅ Found ${users.length} users, seeding blogs...`);

  // --- BLOGS ---
  await Promise.all([
    prisma.blog.create({
      data: {
        title: "React + TypeScript Best Practices",
        slug: "react-typescript-best-practices",
        content: "This is a detailed blog on using React with TypeScript...",
        excerpt: "A guide on best practices for React + TS projects.",
        summary: "Covers setup, typing props, hooks, and advanced tips.",
        isPublished: true,
        tags: ["react", "typescript", "frontend"],
        readTime: 5,
        viewCount: 150,
        authorId: users[0].id, // assign to first user
      },
    }),
    prisma.blog.create({
      data: {
        title: "Node.js API with Express",
        slug: "nodejs-api-express",
        content: "How to build a scalable API with Node.js and Express...",
        excerpt: "Learn how to design scalable Node.js APIs.",
        summary:
          "Best practices in Express project structure, middlewares, and error handling.",
        isPublished: true,
        tags: ["nodejs", "express", "backend"],
        readTime: 7,
        viewCount: 200,
        authorId: users[1]?.id || users[0].id, // fallback to user[0] if only 1 user
      },
    }),
    prisma.blog.create({
      data: {
        title: "CSS Grid vs Flexbox",
        slug: "css-grid-vs-flexbox",
        content: "When to use CSS Grid and when to use Flexbox...",
        excerpt: "Understanding layout systems in CSS.",
        summary:
          "Learn when to use CSS Grid or Flexbox with examples.",
        isPublished: true,
        tags: ["css", "grid", "flexbox"],
        readTime: 4,
        viewCount: 180,
        authorId: users[2]?.id || users[0].id, // fallback
      },
    }),
  ]);

  console.log("✅ Blogs created");
  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
