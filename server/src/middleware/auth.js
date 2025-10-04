// server/src/middleware/auth.js
import { OAuth2Client } from "google-auth-library";
import prisma from "../prisma.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Authenticate user with Google ID token
 */
export const authenticateGoogle = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No Google token provided" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.picture,
        },
      });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "User account is deactivated" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error("❌ Google auth failed:", err.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

/**
 * Ensure the logged-in user is the blog author OR admin
 */
export const requireBlogAuthor = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.authorId !== req.user.id && req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to modify this blog" });
    }

    next();
  } catch (err) {
    console.error("❌ Blog author check failed:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Authorization check failed" });
  }
};

/**
 * Ensure the logged-in user is an admin
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access required" });
  }
  next();
};
