import express from "express";
import { collectEvent } from "../controllers/collectController.js";

const router = express.Router();

router.post("/collect", collectEvent);

export default router;