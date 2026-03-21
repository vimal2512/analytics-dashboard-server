import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./api/routes/authRoutes.js";
import collectRoutes from "./api/routes/collectRoutes.js";
import analyticsRoutes from "./api/routes/analyticsRoutes.js";
import trackRoutes from "./api/routes/trackRoutes.js";
import websiteRoutes from "./api/routes/websiteRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { isAllowedOrigin } from "./utils/cors.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
CORS
*/

app.use(
  cors({
    origin: function (origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed: " + origin));
    },
    credentials: true
  })
);

app.use(express.json());

/*
Routes
*/

app.use("/api/track", trackRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Analytics backend running" });
});

app.get("/tracker.js", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../tracker/tracker.js")
  );
});

app.use("/api", collectRoutes);
app.use("/api", websiteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

/*
Error handler
*/

app.use(errorHandler);

export default app;