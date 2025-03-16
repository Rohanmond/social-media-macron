import { app } from "./app";
import { AppError } from "./core/AppError";
import { errorHandler } from "./middlewares/errorHandler.middleware";

if (!process.env.PORT) {
  throw new AppError("PORT environment variable is not defined", 500);
}

const PORT = process.env.PORT;

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
