import express from "express";
import {
  createWebsite,
  getWebsites,
  deleteWebsite,
  getWebsite,
  updateWebsiteController
} from "../controllers/websiteController.js";

const router = express.Router();

router.get("/websites", getWebsites);

router.post("/websites", createWebsite);

router.delete("/websites/:id", deleteWebsite);

router.get("/websites/:id", getWebsite);

router.put("/websites/:id", updateWebsiteController);

export default router;