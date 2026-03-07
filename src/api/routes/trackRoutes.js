import express from "express";
import { trackEvent } from "api/controllers/trackController.js";

const router = express.Router();

router.post("/", trackEvent);

export default router;