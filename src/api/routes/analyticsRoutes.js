import express from "express";

import {
  getSummary,
  getTraffic,
  getTopPages
} from "../controllers/analyticsController.js";

const router = express.Router();

/*
Analytics Dashboard APIs
*/

router.get("/summary", getSummary);

router.get("/traffic", getTraffic);

router.get("/top-pages", getTopPages);

export default router;