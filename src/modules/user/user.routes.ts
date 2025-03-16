import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  follow,
  followers,
  following,
  getMe,
  getUserProfile,
  myFollowers,
  myFollowing,
  unfollow,
} from "./user.controller";

export const userRoutes = Router();

// Get current user profile
userRoutes.get("/me", authenticate, getMe);
userRoutes.get("/followers", authenticate, myFollowers);
userRoutes.get("/following", authenticate, myFollowing);

// Get other user profile
userRoutes.get("/:id", getUserProfile);

// Follow / Unfollow
userRoutes.post("/:id/follow", authenticate, follow);
userRoutes.delete("/:id/unfollow", authenticate, unfollow);

// List followers & following
userRoutes.get("/:id/followers", followers);
userRoutes.get("/:id/following", following);
