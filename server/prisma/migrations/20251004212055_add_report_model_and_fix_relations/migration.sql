/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,blogId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,blogId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Made the column `readTime` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Blog" ALTER COLUMN "tags" DROP DEFAULT,
ALTER COLUMN "readTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."ContactRequest" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "public"."Follows" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Report" (
    "id" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "reporterId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_blogId_key" ON "public"."Bookmark"("userId", "blogId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_blogId_key" ON "public"."Like"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "public"."ContactRequest" ADD CONSTRAINT "ContactRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
