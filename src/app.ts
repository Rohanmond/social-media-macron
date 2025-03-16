import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

dotenv.config();

export const app: Express = express();

// Express.json() is a middleware that parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// Cors is a middleware that enables Cross-Origin Resource Sharing (CORS) for your app.
app.use(cors());
// Helmet is a middleware that secures your app by setting various HTTP headers (ex. X-Frame-Options, X-XSS-Protection, etc.)
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/healthcheck", (req, res) => {
  res.send("Server is running...");
});
