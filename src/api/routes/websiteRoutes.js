import express from "express";

import {
  createWebsiteController,
  getWebsites,
  deleteWebsite,
  getWebsite,
  updateWebsiteController
} from "../controllers/websiteController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/websites", protect, getWebsites);

router.post("/websites", protect, createWebsiteController);

router.delete("/websites/:id", protect, deleteWebsite);

router.get("/websites/:id", protect, getWebsite);

router.put("/websites/:id", protect, updateWebsiteController);

export default router;