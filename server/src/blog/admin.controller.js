import { prisma } from '../config/database.js';

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalLikes,
      totalBookmarks,
      totalComments,
      recentUsers,
      recentBlogs,
      topBlogs
    ] = await Promise.all([
      prisma.user.count(),
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.blog.count({ where: { isPublished: false } }),
      prisma.like.count(),
      prisma.bookmark.count(),
      prisma.comment.count(),
      prisma.user.findMany({
        where: {
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, avatar: true, createdAt: true, role: true }
      }),
      prisma.blog.findMany({
        include: {
          author: { select: { id: true, name: true, email: true, avatar: true } },
          _count: { select: { likes: true, bookmarks: true, comments: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.blog.findMany({
        where: { isPublished: true },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { likes: true, bookmarks: true, comments: true } }
        },
        orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
        take: 5
      })
    ]);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const [currentMonthUsers, previousMonthUsers] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } })
    ]);

    const userGrowth =
      previousMonthUsers === 0
        ? 100
        : ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalBlogs,
          publishedBlogs,
          draftBlogs,
          totalLikes,
          totalBookmarks,
          totalComments,
          userGrowth: Math.round(userGrowth * 100) / 100
        },
        recentActivity: { recentUsers, recentBlogs, topBlogs }
      }
    });
  } catch (error) {
    console.error('❌ getAdminStats failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};

/**
 * Get all users with pagination and filtering
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(role && { role }),
      ...(isActive !== undefined && { isActive: isActive === 'true' })
    };

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: { select: { blogs: true, likes: true, bookmarks: true } }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take
      }),
      prisma.user.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: take,
          total: totalCount,
          pages: Math.ceil(totalCount / take)
        }
      }
    });
  } catch (error) {
    console.error('❌ getAllUsers failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        _count: { select: { blogs: true, likes: true, bookmarks: true, comments: true } }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    console.error('❌ getUserById failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};

/**
 * Update user role or status
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;

    if (id === req.user.id && isActive === false) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate your own account' });
    }

    const updateData = {};
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, avatar: true, role: true, isActive: true, createdAt: true }
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('❌ updateUserRole failed:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ deleteUser failed:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

/**
 * Get all blogs with admin privileges
 */
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, author, isPublished, isFeatured, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(author && { author: { name: { contains: author, mode: 'insensitive' } } }),
      ...(isPublished !== undefined && { isPublished: isPublished === 'true' }),
      ...(isFeatured !== undefined && { isFeatured: isFeatured === 'true' })
    };

    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true, avatar: true } },
          _count: { select: { likes: true, bookmarks: true, comments: true } }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take
      }),
      prisma.blog.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: take,
          total: totalCount,
          pages: Math.ceil(totalCount / take)
        }
      }
    });
  } catch (error) {
    console.error('❌ getAllBlogs failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

/**
 * Update blog
 */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished, isFeatured, tags } = req.body;

    const updateData = {};
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
    if (tags !== undefined) updateData.tags = tags;

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        _count: { select: { likes: true, bookmarks: true, comments: true } }
      }
    });

    res.status(200).json({ success: true, message: 'Blog updated successfully', data: { blog } });
  } catch (error) {
    console.error('❌ updateBlog failed:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog' });
  }
};

/**
 * Delete blog
 */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('❌ deleteBlog failed:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

/**
 * Get content moderation queue
 */
export const getModerationQueue = async (req, res) => {
  try {
    const { type = 'all' } = req.query;
    const result = {};

    if (type === 'all' || type === 'comments') {
      result.comments = await prisma.comment.findMany({
        where: { isApproved: false },
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          blog: { select: { id: true, title: true, slug: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    if (type === 'all' || type === 'reports') {
      result.reports = []; // placeholder
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('❌ getModerationQueue failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch moderation queue' });
  }
};

/**
 * Approve/reject comment
 */
export const moderateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const comment = await prisma.comment.update({
      where: { id },
      data: { isApproved },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        blog: { select: { id: true, title: true, slug: true } }
      }
    });

    res.status(200).json({
      success: true,
      message: `Comment ${isApproved ? 'approved' : 'rejected'} successfully`,
      data: { comment }
    });
  } catch (error) {
    console.error('❌ moderateComment failed:', error);
    res.status(500).json({ success: false, message: 'Failed to moderate comment' });
  }
};




const trendingTags = await prisma.blog.groupBy({
  by: ['tags'],
  _count: true,
  orderBy: { _count: { _all: 'desc' } },
  take: 5,
});

res.status(200).json({
  success: true,
  data: {
    overview: {
      totalUsers,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalLikes,
      totalBookmarks,
      totalComments,
      userGrowth: Math.round(userGrowth * 100) / 100
    },
    recentActivity: { recentUsers, recentBlogs, topBlogs },
    trendingTags
  }
});
