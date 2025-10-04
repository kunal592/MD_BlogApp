import prisma from '../prisma.js';

/**
 * Get a user by ID (public profile)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
        blogs: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('❌ getUserById failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Follow a user
 */
export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const followerId = req.user?.id;

    if (id === followerId) {
      return res.status(400).json({ success: false, message: "You can't follow yourself" });
    }

    await prisma.follows.create({
      data: { followerId, followingId: id },
    });

    res.json({ success: true, message: 'Followed user successfully' });
  } catch (error) {
    console.error('❌ followUser failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const followerId = req.user?.id;

    await prisma.follows.delete({
      where: {
        followerId_followingId: { followerId, followingId: id },
      },
    });

    res.json({ success: true, message: 'Unfollowed user successfully' });
  } catch (error) {
    console.error('❌ unfollowUser failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * User Dashboard
 */
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await prisma.blog.findMany({
      where: { authorId: userId },
      include: { _count: { select: { likes: true, bookmarks: true, comments: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const totalViews = await prisma.blog.aggregate({
      where: { authorId: userId },
      _sum: { viewCount: true },
    });

    res.json({
      success: true,
      data: {
        stats: {
          blogsPublished: await prisma.blog.count({ where: { authorId: userId } }),
          totalViews: totalViews._sum.viewCount || 0,
          likesReceived: blogs.reduce((acc, b) => acc + b._count.likes, 0),
          bookmarksReceived: blogs.reduce((acc, b) => acc + b._count.bookmarks, 0),
          blogsLiked: await prisma.like.count({ where: { userId } }),
          blogsBookmarked: await prisma.bookmark.count({ where: { userId } }),
        },
        recentBlogs: blogs,
        recentLikes: await prisma.like.findMany({
          where: { userId },
          include: { blog: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
        recentBookmarks: await prisma.bookmark.findMany({
          where: { userId },
          include: { blog: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
      },
    });
  } catch (err) {
    console.error('❌ getDashboard failed:', err);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
};

/**
 * User Stats
 */
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogsPublished = await prisma.blog.count({ where: { authorId: userId } });
    const totalViews = await prisma.blog.aggregate({
      where: { authorId: userId },
      _sum: { viewCount: true },
    });

    const likesReceived = await prisma.like.count({ where: { blog: { authorId: userId } } });
    const bookmarksReceived = await prisma.bookmark.count({ where: { blog: { authorId: userId } } });
    const blogsLiked = await prisma.like.count({ where: { userId } });
    const blogsBookmarked = await prisma.bookmark.count({ where: { userId } });

    res.json({
      success: true,
      data: {
        blogsPublished,
        totalViews: totalViews._sum.viewCount || 0,
        likesReceived,
        bookmarksReceived,
        blogsLiked,
        blogsBookmarked,
      },
    });
  } catch (err) {
    console.error('❌ getStats failed:', err);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
};

/**
 * Liked Blogs (with pagination)
 */
export const getLikedBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [likes, total] = await Promise.all([
      prisma.like.findMany({
        where: { userId },
        include: {
          blog: {
            include: {
              author: { select: { id: true, name: true, avatar: true } },
              _count: { select: { likes: true, bookmarks: true, comments: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.like.count({ where: { userId } }),
    ]);

    const blogs = likes.map((l) => l.blog);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error('❌ getLikedBlogs failed:', err);
    res.status(500).json({ success: false, message: 'Failed to load liked blogs' });
  }
};

/**
 * Bookmarked Blogs (with pagination)
 */
export const getBookmarkedBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: { userId },
        include: {
          blog: {
            include: {
              author: { select: { id: true, name: true, avatar: true } },
              _count: { select: { likes: true, bookmarks: true, comments: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.bookmark.count({ where: { userId } }),
    ]);

    const blogs = bookmarks.map((b) => b.blog);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error('❌ getBookmarkedBlogs failed:', err);
    res.status(500).json({ success: false, message: 'Failed to load bookmarked blogs' });
  }
};

/**
 * Update current user's profile
 */
export const updateMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, avatar } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, avatar: avatar || null },
    });

    res.json({ success: true, data: { user: updatedUser } });
  } catch (error) {
    console.error('❌ updateMe failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
