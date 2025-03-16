import { AppError } from "../../core/AppError";
import { prisma } from "../../utils/prisma";

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  } catch (err) {
    throw new AppError("User not found", 404);
  }
};

export const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new AppError("Cannot follow yourself", 400);
  }

  try {
    return await prisma.follow.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
      },
    });
  } catch (err) {
    throw new AppError("Failed to follow user", 500);
  }
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new AppError("Cannot unfollow yourself", 400);
  }

  try {
    return await prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
  } catch (err) {
    throw new AppError("Failed to unfollow user", 500);
  }
};

export const getFollowers = async (userId: string) => {
  try {
    return await prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: { select: { id: true, name: true } } },
    });
  } catch (err) {
    throw new AppError("Failed to get followers", 500);
  }
};

export const getFollowing = async (userId: string) => {
  try {
    return await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: { select: { id: true, name: true } } },
    });
  } catch (err) {
    throw new AppError("Failed to get following", 500);
  }
};
