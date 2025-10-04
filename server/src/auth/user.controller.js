// server/src/auth/user.controller.js
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

    if (!followerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (id === followerId) {
      return res.status(400).json({ success: false, message: "You can't follow yourself" });
    }

    // Prevent duplicate follows
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: { followerId, followingId: id },
      },
    });

    if (existingFollow) {
      return res.status(400).json({ success: false, message: 'Already following this user' });
    }

    await prisma.follows.create({
      data: { followerId, followingId: id },
    });

    res.json({ success: true, message: 'Followed successfully' });
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

    if (!followerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await prisma.follows.delete({
      where: {
        followerId_followingId: { followerId, followingId: id },
      },
    });

    res.json({ success: true, message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('❌ unfollowUser failed:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Get followers list
 */
export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const followers = await prisma.follows.findMany({
      where: { followingId: id },
      include: {
        follower: { select: { id: true, name: true, avatar: true } },
      },
    });

    res.json({
      success: true,
      data: followers.map((f) => f.follower),
    });
  } catch (error) {
    console.error('❌ getFollowers failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch followers' });
  }
};

/**
 * Get following list
 */
export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;

    const following = await prisma.follows.findMany({
      where: { followerId: id },
      include: {
        following: { select: { id: true, name: true, avatar: true } },
      },
    });

    res.json({
      success: true,
      data: following.map((f) => f.following),
    });
  } catch (error) {
    console.error('❌ getFollowing failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch following' });
  }
};
