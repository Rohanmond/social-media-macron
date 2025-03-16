import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { ZodError } from "zod";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = registerSchema.parse(req.body);
    const { token, user } = await registerUser(
      data.name,
      data.email,
      data.password
    );
    res.status(201).json({ token, user });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors[0].message });
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data.email, data.password);
    res.json(result);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors[0].message });
    } else {
      next(err);
    }
  }
};
