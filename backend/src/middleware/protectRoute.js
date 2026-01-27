import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      // If user doesn't exist, create them (fallback for when webhooks aren't set up)
      if (!user) {
        const clerkUser = req.auth();

        user = await User.create({
          clerkId,
          email: clerkUser.sessionClaims?.email || `user_${clerkId}@example.com`,
          name: clerkUser.sessionClaims?.name || clerkUser.sessionClaims?.email?.split('@')[0] || "User",
          profileImage: clerkUser.sessionClaims?.image_url || "",
          role: clerkUser.sessionClaims?.metadata?.role || "candidate", // Get role from Clerk metadata or default to candidate
        });

        console.log("✅ Auto-created user:", user.email, "with role:", user.role);
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
