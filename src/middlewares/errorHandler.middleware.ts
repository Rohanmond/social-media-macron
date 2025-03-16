import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../core/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error("Unexpected Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
