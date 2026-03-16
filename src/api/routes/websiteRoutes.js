import express from "express";

import {
  createWebsiteController,
  getWebsites,
  deleteWebsite,
  getWebsite,
  updateWebsiteController
} from "../controllers/websiteController.js";

const router = express.Router();

router.get("/websites", getWebsites);

router.post("/websites", createWebsiteController);

router.delete("/websites/:id", deleteWebsite);

router.get("/websites/:id", getWebsite);

router.put("/websites/:id", updateWebsiteController);

export default router;