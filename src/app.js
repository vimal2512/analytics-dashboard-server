import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import collectRoutes from "./api/routes/collectRoutes.js"
import analyticsRoutes from "./api/routes/analyticsRoutes.js"

import { errorHandler } from "./middleware/errorHandler.js";
import trackRoutes from "./api/routes/trackRoutes.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://task-tracker-olive-eta.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/track", trackRoutes);

app.get("/", (req,res) => {
    res.json({message: "Analytics backend running"})
});

app.get("/tracker.js", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../tracker/tracker.js")
  );
});

app.use("/api", collectRoutes);
app.use("/api/analytics",analyticsRoutes);

app.use(errorHandler);

export default app;