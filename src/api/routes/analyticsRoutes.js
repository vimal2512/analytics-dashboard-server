import express from "express";

import {
  getSummary,
  getTraffic,
  getTopPages,
  getTopEvents,
  getTopReferrers,
  getTopCountries,
  getSessionAnalytics
} from "../controllers/analyticsController.js";

const router = express.Router();

/*
Analytics Dashboard APIs
*/

router.get("/summary", getSummary);

router.get("/traffic", getTraffic);

router.get("/top-pages", getTopPages);

router.get("/top-events", getTopEvents);

router.get("/top-referrers", getTopReferrers);

router.get("/top-countries", getTopCountries);

router.get("/session-analytics", getSessionAnalytics);

export default router;