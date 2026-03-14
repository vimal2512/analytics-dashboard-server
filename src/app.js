import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import collectRoutes from "./api/routes/collectRoutes.js";
import analyticsRoutes from "./api/routes/analyticsRoutes.js";
import trackRoutes from "./api/routes/trackRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
Allowed frontend origins
*/

const allowedOrigins = [
  "https://task-tracker-olive-eta.vercel.app",
  "https://analytics-dashboard-client-q0ifa7ij8.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
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
  res.sendFile(path.join(__dirname, "../tracker/tracker.js"));
});

app.use("/api", collectRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;