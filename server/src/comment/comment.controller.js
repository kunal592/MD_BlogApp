import { prisma } from '../config/database.js';

// @desc    Create a new comment
// @route   POST /api/blogs/:slug/comments
// @access  Private
export const createComment = async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const { slug } = req.params;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Comment content is required' });
    }

    // Find blog by slug
    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true, title: true, authorId: true },
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        blogId: blog.id,
        userId,
        parentId: parentId || null,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    // 🔔 Notify blog author (if not self-comment)
    if (blog.authorId !== userId) {
      await prisma.notification.create({
        data: {
          type: parentId ? 'COMMENT_REPLY' : 'NEW_COMMENT',
          message: parentId
            ? `${req.user.name} replied to a comment on "${blog.title}"`
            : `${req.user.name} commented on your blog "${blog.title}"`,
          senderId: userId,
          recipientId: blog.authorId,
        },
      });
    }

    res.status(201).json({ success: true, data: { comment } });
  } catch (error) {
    console.error('❌ createComment failed:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

// @desc    Like or Unlike a comment
// @route   POST /api/blogs/:slug/comments/:commentId/like
// @access  Private
export const toggleLikeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        id: true,
        content: true,
        userId: true,
        blog: { select: { id: true, title: true } },
      },
    });

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Check if like exists
    const existingLike = await prisma.commentLike.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });

    if (existingLike) {
      // Unlike
      await prisma.commentLike.delete({ where: { id: existingLike.id } });
      return res.status(200).json({ success: true, message: 'Comment unliked' });
    }

    // Like the comment
    await prisma.commentLike.create({
      data: { userId, commentId },
    });

    // 🔔 Notify comment author
    if (comment.userId !== userId) {
      await prisma.notification.create({
        data: {
          type: 'COMMENT_LIKE',
          message: `${req.user.name} liked your comment on "${comment.blog.title}"`,
          senderId: userId,
          recipientId: comment.userId,
        },
      });
    }

    res.status(201).json({ success: true, message: 'Comment liked' });
  } catch (error) {
    console.error('❌ toggleLikeComment failed:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
