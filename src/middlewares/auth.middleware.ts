import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../core/AppError";

if (!process.env.JWT_SECRET) {
  throw new AppError("JWT_SECRET environment variable is not defined", 500);
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded;
    next(); // Proceed to protected route
  } catch (err) {
    return next(new AppError("Unauthorized: Invalid token", 401));
  }
};
