import express from "express";
import { trackEvent } from "../controllers/trackController.js";

const router = express.Router();

router.post("/", trackEvent);

export default router;