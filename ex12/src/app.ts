import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";

import { initCorsMiddleware } from "./lib/middleware/cors";

import gemRoutes from "./routes/gems";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/gems", gemRoutes);

app.use(validationErrorMiddleware);

export default app;
