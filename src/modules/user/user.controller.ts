import { NextFunction, Request, Response } from "express";
import {
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "./user.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../core/AppError";

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.user!.userId);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const myFollowers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const followers = await getFollowers(req.user!.userId);
    res.status(200).json(followers);
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export const follow = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const follow = await followUser(req.user!.userId, req.params.id);
    res.status(200).json({ message: "Followed successfully", follow });
  } catch (err) {
    next(err);
  }
};

export const unfollow = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await unfollowUser(req.user!.userId, req.params.id);
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    next(err);
  }
};

export const followers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const followers = await getFollowers(req.params.id);
    res.status(200).json(followers);
  } catch (err) {
    next(err);
  }
};

export const following = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const following = await getFollowing(req.params.id);
    res.status(200).json(following);
  } catch (err) {
    next(err);
  }
};

export const myFollowing = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const following = await getFollowing(req.user!.userId);
    res.status(200).json(following);
  } catch (err) {
    next(err);
  }
};
